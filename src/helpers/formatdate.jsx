import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const formatDate = (date) => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    return dayjs
        .tz(date, "UTC")
        .tz(dayjs.tz.guess())
        .format("DD/MMMM/YYYY HH:mm");
};

const formatOnlyDate = (date) => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    return dayjs
        .tz(date, "UTC")
        .tz(dayjs.tz.guess())
        .format("DD/MMMM/YYYY");
};

export { formatDate, formatOnlyDate };