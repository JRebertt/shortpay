// src/components/MultiStepFormComponent.ts
import React from 'react'
import ReactDOM from 'react-dom/client'

import { MultiStepForm } from '.'

class MultiStepFormComponent extends HTMLElement {
  connectedCallback() {
    const organization = this.getAttribute('organization') || 'default-org'
    const integrationId = this.getAttribute('integration-id') || 'default-id'
    this.mount(organization, integrationId)
  }

  mount(organization: string, integrationId: string) {
    const container = document.createElement('div')
    this.attachShadow({ mode: 'open' }).appendChild(container)

    const root = ReactDOM.createRoot(container)
    root.render(
      <MultiStepForm
        organization={organization}
        integrationId={integrationId}
        onSubmit={(data) => console.log('Form submitted:', data)}
      />,
    )
  }
}

customElements.define('multi-step-form', MultiStepFormComponent)
