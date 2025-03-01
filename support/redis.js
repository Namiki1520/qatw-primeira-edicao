import { Queue } from "bullmq";

const connection = {
    host: 'paybank-redis',
    port: 6379
}

const queueName = 'twoFactorQueue'

const queue = new Queue(queueName, { connection })

export const getJob = async () => {
    const jobs = await queue.getJob(["waiting", "delayed", "active"]);

    if (!jobs.length) {
        console.warn("⚠ Nenhum job encontrado na fila.");
        return null; // Retorna null para evitar erro
    }

    console.log("✅ Job encontrado:", jobs[0].data);
    return jobs[0].data.code; // Retorna apenas o código 2FA
};

export const cleanJobs = async () => {
    await queue.obliterate({ force: true })
}