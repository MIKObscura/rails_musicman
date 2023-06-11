import { Application } from "@hotwired/stimulus"
import Chart from "chart.js/auto"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }
