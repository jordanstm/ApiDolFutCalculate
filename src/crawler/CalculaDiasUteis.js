

function getUtilDays(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    var holidays = [
        new Date(year, 0, 1),  // Ano Novo
        new Date(year, 1, 13),  // Carnaval
        new Date(year, 2, 29),  // Sexta Feira SAnta
        new Date(year, 3, 7), // Paixao de cristo
        new Date(year, 3, 21), // Tiradentes
        new Date(year, 4, 1), // dia do trabalho    
        new Date(year, 8, 7), // dia mundial do trabalho
        new Date(year, 9, 12), // Nossa Senhora Aparecida
        new Date(year, 10, 15), // Proclamação da republica
        new Date(year, 10, 2), // diaFinados
        new Date(year, 11, 25), // Natal
       
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
    return days.length;
}


export default getUtilDays;