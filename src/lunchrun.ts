
import { IntegrationService } from "./services/integration_service";

let _integrationService = new IntegrationService();

async function run() {
    try {
        const result = await _integrationService.PredictiveAnalysis();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
}

run();