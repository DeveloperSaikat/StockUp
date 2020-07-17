export class sample{
    constructor(public Global = {
            NewConfirmed: 0,
            NewDeaths: 0,
            NewRecovered: 0,
            TotalConfirmed: 0,
            TotalDeaths: 0,
            TotalRecovered: 0
        },
        public Countries: any[],
        public Date: string){}
}