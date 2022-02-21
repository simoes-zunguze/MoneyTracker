

export function getDate(date: Date) {
    const formatedDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    return formatedDate;
}


export function getTime(date: Date) {
    const formatedDate = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return formatedDate;
}


export function getDateTime(date: Date) {
    const formatedDate = getDate(date) + " " + getTime(date);
    return formatedDate;
}

export function getLocalDateTime(date: Date) {
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const localTime = date.getTime() - localOffset;
    return getDateTime(new Date(localTime));
}