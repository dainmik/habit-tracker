import {
	addDays as _addDays,
	addMonths as _addMonths,
	getDate as _getDate,
	isAfter as _isAfter,
	isBefore as _isBefore,
	isSameDay as _isSameDay,
	isToday as _isToday,
	isValid as _isValid,
	parseISO as _parseISO,
	startOfDay as _startOfDay,
	startOfToday as _startOfToday,
	format,
} from "date-fns";

import { tz, TZDate } from "@date-fns/tz";

export type IsoDateString = string;
export type DateType = TZDate;

const timeZone = "Europe/Vilnius";
const timeZoneOptions = { in: tz(timeZone) };

export function currentDate() {
	return new TZDate(new Date(), timeZone);
}

export function parseISO(iso: IsoDateString) {
	return _parseISO(iso, timeZoneOptions);
}

export function convertDateToIso(date: DateType): IsoDateString {
	return format(date, "yyyy-MM-dd", timeZoneOptions);
}

export function addDays(date: DateType, number: number) {
	return _addDays(date, number, timeZoneOptions);
}

export function addMonths(date: DateType, number: number) {
	return _addMonths(date, number, timeZoneOptions);
}

export function getDayOfMonthNumber(date: DateType) {
	return _getDate(date, timeZoneOptions);
}

/**
 * Mo, Tu, We, ..., Su
 */
export function getWeekdayNameTruncated(date: DateType) {
	return format(date, "EEEEEE", timeZoneOptions);
}

export function isAfter(date: DateType, dateToCompare: DateType) {
	return _isAfter(date, dateToCompare);
}

export function isBefore(date: DateType, dateToCompare: DateType) {
	return _isBefore(date, dateToCompare);
}

export function isSameDay(dateOne: DateType, dateTwo: DateType) {
	return _isSameDay(dateOne, dateTwo, timeZoneOptions);
}
export function isToday(date: DateType) {
	return _isToday(date, timeZoneOptions);
}

export function startOfToday() {
	return _startOfToday(timeZoneOptions);
}

export function startOfDay(date: DateType) {
	return _startOfDay(date, timeZoneOptions);
}

export function isValid(date: IsoDateString) {
	const parsed = parseISO(date);
	return _isValid(parsed);
}
