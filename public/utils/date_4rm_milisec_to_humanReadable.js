import { monthNames } from "./month_names.js";
const convertDateFromMilliSecToDateString = (value) => {
    if(value)
    {
        console.log(value);
        // const ts = (value.seconds+value.nanoseconds/1000000000)*1000;
        // const ts = (value.seconds+value.nanoseconds/1000000000)*1000;

        // nanoseconds
        let dt = new Date(Number(value));
        let y = dt.getFullYear();
        let m = monthNames[dt.getMonth()];
        let d = dt.getDate();
        return `${d} ${m}, ${y}`;
    }
};
export { convertDateFromMilliSecToDateString };