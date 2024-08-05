import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node";


Sentry.init({
    dsn: "https://be46172fa1bf19aa4fa3fb04e203e207@o4509588464009216.ingest.us.sentry.io/4509588468465669",
    sendDefaultPii: true,

    integrations: [
        nodeProfilingIntegration(),
        Sentry.mongoIntegration()
    ],

    // tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
});

Sentry.profiler.startProfiler();

Sentry.startSpan({
    name:"My First Transaction",
},()=>{

})
