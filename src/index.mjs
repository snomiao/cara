import ical from "ical";
import "sno-utils";
import { 文件写入, 文本文件缓存 } from "sno-utils";
import TSV from "tsv";
await import("dotenv").then((e) => e.config());
const { CACHE_PATH = ".schcal", ICS_URL } = process.env;
console.log("started");

const ics抓取器 = async () => {
    if (!ICS_URL) throw new Error("no ICS URL");
    console.log("fetching", ICS_URL);
    const myFetch = 
        globalThis.fetch || (await import("node-fetch-with-proxy")).default;
    return await myFetch(ICS_URL).then((e) => e.text());
};

const ics = await 文本文件缓存(CACHE_PATH + "/cache.ics", ics抓取器);
console.time("parseICS");
const obj = ical.parseICS(ics);
console.timeEnd("parseICS");
console.table(obj);
// 输入类型 功能描述（可选） 输出类型
await 文件写入(CACHE_PATH + "/out.json", JSON.stringify(obj, null, 4));
// await 文件写入(".schcal/out.tsv", TSV.CSV.stringify(日历obj));
