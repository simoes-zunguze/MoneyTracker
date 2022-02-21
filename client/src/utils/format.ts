
export class Format {
    private static moneyFormater: MoneyFormater;

    public static getMoneyInstance(): MoneyFormater {
        
        if (Format.moneyFormater) {
  
            return Format.moneyFormater;
        } else {
            Format.moneyFormater = new MoneyFormater();
            return Format.moneyFormater;
        }
    }

}

class MoneyFormater {
    private formater: Intl.NumberFormat;

    constructor(private locale = 'en-US', private symbol = 'MT') {
        this.formater = Intl.NumberFormat(locale);
    }

    format(value: number | string ) {
        value = parseFloat(value+'');
        return this.formater.format(value) + ' ' + this.symbol;
    }
}