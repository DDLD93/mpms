const {
    SCHEDULER_URL,
    APP_RABBITMQ_URL,
    PROJECT_ONBOARDING_QUEUE_NAME
} = process.env

module.exports = {
    rabbitmqUri: APP_RABBITMQ_URL || "",
    projectOnboardingQue: PROJECT_ONBOARDING_QUEUE_NAME || "",
    schedulerURL: SCHEDULER_URL || "http://localhost:9000/api/v1/scheduler/add"
}