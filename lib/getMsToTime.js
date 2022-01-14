export const getMsToTime = (duration) => {
    const portions = [];

    const msInHour = 1000 * 60 * 60;
    const hours = Math.trunc(duration / msInHour);
    if (hours > 0) {
        portions.push(hours + ':');
        duration = duration - (hours * msInHour);
    }

    const msInMinute = 1000 * 60;
    const minutes = Math.trunc(duration / msInMinute);
    if (minutes > 0) {
        portions.push(minutes + ':');
        duration = duration - (minutes * msInMinute);
    } else {
        portions.push("00:")
    }

    let seconds = Math.trunc(duration / 1000);
    if (seconds > 0) {
        if(!seconds.toString()[1]) { 
            seconds = "0" + seconds
        }
        portions.push(seconds);
    } else {
        portions.push("00")
    }

    return portions.join('');
}