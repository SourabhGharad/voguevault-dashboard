import {APP_SETTINGS} from "./app-setting";

export function formatCurrency(value: number){
    return new Intl.NumberFormat(APP_SETTINGS.locale,{
        style : "currency",
        currency : APP_SETTINGS.currency
    }).format(value);
}