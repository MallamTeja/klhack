import dns from 'dns';
import util from 'util';

const resolveSrv = util.promisify(dns.resolveSrv);
const resolveTxt = util.promisify(dns.resolveTxt);
const resolve4 = util.promisify(dns.resolve4);

const hostname = '_mongodb._tcp.deepak.yfvu72a.mongodb.net';

async function diagnose() {
    console.log(`[Diagnostic] Attempting to resolve SRV record for: ${hostname}`);

    try {
        const srvRecords = await resolveSrv(hostname);
        console.log(`\n✅ SRV Lookup Success. Found ${srvRecords.length} MongoDB nodes:`);
        console.log(srvRecords);

        console.log(`\n[Diagnostic] Attempting to resolve A record for the first node: ${srvRecords[0].name}`);
        try {
            const ipAddresses = await resolve4(srvRecords[0].name);
            console.log(`✅ A Record Lookup Success. IP blocks:`, ipAddresses);
        } catch (aErr) {
            console.error(`❌ Failed to resolve IP for node ${srvRecords[0].name}:`, aErr.message);
        }

    } catch (err) {
        console.error(`\n❌ SRV Lookup Failed! This means your computer cannot find the database over the internet.`);
        console.error(`Error Code:`, err.code);
        console.error(`Error Message:`, err.message);
        console.log("\nIf this fails but works on other networks (like your phone hotspot), your current Wi-Fi/ISP is blocking port 53 or DNS queries to MongoDB Atlas.");
    }
}

diagnose();
