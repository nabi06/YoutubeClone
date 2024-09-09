const Leading_Zero_format=new Intl.NumberFormat(undefined,{
    minimumIntegerDigits:2,
})

export default function formatDuration(duration:number) {
    const hour=Math.floor(duration/3600)
    const minute =Math.floor((duration -hour*3600)/60)
    const sec=duration%60
    if(hour>0){
        return `${hour}:${Leading_Zero_format.format(minute)}:${Leading_Zero_format.format(sec)}` 
    }
    return `${minute}:${Leading_Zero_format.format(sec)}`

}
