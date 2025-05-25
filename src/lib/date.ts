import {
	addDays as _addDays,
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
export type HabitDate = TZDate;

const timeZone = "Europe/Vilnius";
const timeZoneOptions = { in: tz(timeZone) };

export function currentDate() {
	return new TZDate(new Date(), timeZone);
}

export function parseISO(iso: IsoDateString) {
	return _parseISO(iso, timeZoneOptions);
}

export function convertDateToIso(date: HabitDate): IsoDateString {
	return format(date, "yyyy-MM-dd", timeZoneOptions);
}

export function addDays(date: HabitDate, number: number) {
	return _addDays(date, number, timeZoneOptions);
}

export function getDayOfMonthNumber(date: HabitDate) {
	return _getDate(date, timeZoneOptions);
}

/**
 * Mo, Tu, We, ..., Su
 */
export function getWeekdayNameTruncated(date: HabitDate) {
	return format(date, "EEEEEE", timeZoneOptions);
}

export function isAfter(date: HabitDate, dateToCompare: HabitDate) {
	return _isAfter(date, dateToCompare);
}

export function isBefore(date: HabitDate, dateToCompare: HabitDate) {
	return _isBefore(date, dateToCompare);
}

export function isSameDay(dateOne: HabitDate, dateTwo: HabitDate) {
	return _isSameDay(dateOne, dateTwo, timeZoneOptions);
}
export function isToday(date: HabitDate) {
	return _isToday(date, timeZoneOptions);
}

export function startOfToday() {
	return _startOfToday(timeZoneOptions);
}

export function startOfDay(date: HabitDate) {
	return _startOfDay(date, timeZoneOptions);
}

export function isValid(date: IsoDateString) {
	const parsed = parseISO(date);
	return _isValid(parsed);
}
