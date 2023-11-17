

function getUtilDays(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    var holidays = [
        new Date(year, 0, 1),  // Ano Novo
        new Date(year, 3, 7), // Paixao de cristo
        new Date(year, 3, 21), // Tiradentes
        new Date(year, 8, 7), // dia mundial do trabalho
       
    ];
    while (date.getMonth() === month) {
        if (date.getDay() !== 0 && date.getDay() !== 6) {
            // Verifica se a data não é um feriado
            if (!holidays.some(holiday => holiday.getTime() === date.getTime())) {
                days.push(new Date(date));
            }
        }
        date.setDate(date.getDate() + 1);
    }
    return days;
}


export default getUtilDays;