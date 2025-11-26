import { createButton } from '../../util.js';

export class WizardLayout {
  inputFields = 'input,textarea,select';

  constructor(includePrevBtn = true, includeNextBtn = true) {
    this.includePrevBtn = includePrevBtn;
    this.includeNextBtn = includeNextBtn;
  }

  // eslint-disable-next-line class-methods-use-this
  getSteps(panel) {
    return [...panel.children].filter((step) => step.tagName.toLowerCase() === 'fieldset');
  }

  assignIndexToSteps(panel) {
    const steps = this.getSteps(panel);
    panel.style.setProperty('--wizard-step-count', steps.length);
    steps.forEach((step, index) => {
      step.dataset.index = index;
      step.style.setProperty('--wizard-step-index', index);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getEligibleSibling(current, forward = true) {
    const direction = forward ? 'nextElementSibling' : 'previousElementSibling';

    for (let sibling = current[direction]; sibling; sibling = sibling[direction]) {
      if (sibling.dataset.visible !== 'false' && sibling.tagName === 'FIELDSET') {
        return sibling;
      }
    }
    return null;
  }

  /**
 * @param {FormElement | Fieldset} container
 * @returns return false, if there are invalid fields
 */
  validateContainer(container) {
    const fieldElements = [...container.querySelectorAll(this.inputFields)];
    const isValid = fieldElements.reduce((valid, fieldElement) => {
      const isHidden = fieldElement.closest('.field-wrapper')?.dataset?.visible === 'false';
      let isFieldValid = true;
      if (!isHidden) {
        isFieldValid = fieldElement.checkValidity();
      }
      return valid && isFieldValid;
    }, true);

    if (!isValid) {
      container.querySelector(':invalid')?.focus();
    }
    return isValid;
  }

  navigate(panel, forward = true) {
    const current = panel.querySelector('.current-wizard-step');
    const currentMenuItem = panel.querySelector('.wizard-menu-active-item');

    let valid = true;
    if (forward) {
      valid = this.validateContainer(current);
    }
    const navigateTo = valid ? this.getEligibleSibling(current, forward) : current;

    if (navigateTo && current !== navigateTo) {
      const currentIndex = +current.dataset.index;
      const navigateToIndex = +navigateTo.dataset.index;
      const allMenuItems = panel.querySelectorAll('.wizard-menu-item');

      // Update step states
      allMenuItems.forEach((menuItem) => {
        const itemIndex = +menuItem.dataset.index;
        menuItem.classList.remove('wizard-menu-active-item', 'wizard-step-completed', 'wizard-step-pending');

        if (itemIndex === navigateToIndex) {
          // Active step
          menuItem.classList.add('wizard-menu-active-item');
        } else if (itemIndex < navigateToIndex) {
          // Completed steps (before active)
          menuItem.classList.add('wizard-step-completed');
        } else {
          // Pending steps (after active)
          menuItem.classList.add('wizard-step-pending');
        }
      });

      // Update fieldset classes
      current.classList.remove('current-wizard-step');
      navigateTo.classList.add('current-wizard-step');

      const event = new CustomEvent('wizard:navigate', {
        detail: {
          prevStep: { id: current.id, index: currentIndex },
          currStep: { id: navigateTo.id, index: navigateToIndex },
        },
        bubbles: false,
      });
      panel.dispatchEvent(event);
    }
  }

  static handleMutation(panel, mutationsList) {
    mutationsList.forEach((mutation) => {
      const { type, target, attributeName } = mutation;
      const menuItems = panel.querySelector('.wizard-menu-items');
      // Check if the mutation is a change in attributes(data-visible)
      if (type === 'attributes' && attributeName === 'data-visible') {
        const element = mutation.target;
        const menuItem = panel.querySelector(`li[data-index="${element.dataset.index}"]`);
        menuItem.dataset.visible = element.dataset.visible;
      } else if (type === 'attributes' && attributeName === 'data-active') {
        // for active panel
        panel.querySelector('.current-wizard-step')?.classList.remove('current-wizard-step');
        const activePanel = panel.querySelector(`#${target?.id}`);
        activePanel?.classList.add('current-wizard-step');
        
        // Update all menu item states
        const activeIndex = +activePanel.dataset.index;
        const allMenuItems = menuItems.querySelectorAll('li');
        allMenuItems.forEach((menuItem) => {
          const itemIndex = +menuItem.dataset.index;
          menuItem.classList.remove('wizard-menu-active-item', 'wizard-step-completed', 'wizard-step-pending');
          
          if (itemIndex === activeIndex) {
            menuItem.classList.add('wizard-menu-active-item');
          } else if (itemIndex < activeIndex) {
            menuItem.classList.add('wizard-step-completed');
          } else {
            menuItem.classList.add('wizard-step-pending');
          }
        });
        
        target.querySelector('[data-active="true"]')?.focus();
      }
    });
  }

  static attachMutationObserver(panel) {
    const children = panel.querySelectorAll(':scope > .panel-wrapper');
    // Options for the observer (attributes to observe for)
    const config = { attributes: true, subtree: false };
    // Create an observer instance linked to the callback function
    const observer = new window.MutationObserver((mutationsList) => {
      WizardLayout.handleMutation(panel, mutationsList);
    });
    // Start observing each target node for configured mutations
    children.forEach((targetNode) => {
      observer.observe(targetNode, config);
    });
  }

  static createMenu(children) {
    const ul = document.createElement('ul');
    ul.className = 'wizard-menu-items';
    children.forEach((child, index) => {
      const li = document.createElement('li');
      li.innerHTML = child.querySelector('legend')?.innerHTML || '';
      li.className = 'wizard-menu-item';
      li.dataset.index = index;
      if (child.hasAttribute('data-visible')) {
        li.dataset.visible = child.dataset.visible;
      }
      ul.append(li);
    });
    return ul;
  }

  addButton(wrapper, panel, buttonDef, forward = true) {
    const button = createButton(buttonDef);
    button.classList.add(buttonDef.id);
    button.addEventListener('click', () => this.navigate(panel, forward));
    wrapper.append(button);
  }

  applyLayout(panel) {
    const children = panel.querySelectorAll(':scope > .panel-wrapper');
    if (children.length) {
      // create wizard menu
      const wizardMenu = WizardLayout.createMenu(Array.from(children));
      const menuItems = wizardMenu.querySelectorAll('li');
      
      // Set initial states: first step is active, others are pending
      menuItems.forEach((menuItem, index) => {
        if (index === 0) {
          menuItem.classList.add('wizard-menu-active-item');
        } else {
          menuItem.classList.add('wizard-step-pending');
        }
      });

      // Insert the menu before the first child of the wizard
      panel.insertBefore(wizardMenu, children[0]);
      WizardLayout.attachMutationObserver(panel);
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'wizard-button-wrapper';
    if (this.includePrevBtn && children.length) {
      this.addButton(wrapper, panel, {
        label: { value: 'Back' }, fieldType: 'button', name: 'back', id: 'wizard-button-prev',
      }, false);
    }

    if (this.includeNextBtn && children.length) {
      this.addButton(wrapper, panel, {
        label: { value: 'Next' }, fieldType: 'button', name: 'next', id: 'wizard-button-next',
      });
    }

    this.assignIndexToSteps(panel);
    panel.append(wrapper);
    panel.querySelector('fieldset')?.classList.add('current-wizard-step');
    panel.classList.add('wizard');
    // panel.classList.add('left');
  }
}

const layout = new WizardLayout();

export default function wizardLayout(panel) {
  layout.applyLayout(panel);
  return panel;
}

export const navigate = layout.navigate.bind(layout);
export const validateContainer = layout.validateContainer.bind(layout);
