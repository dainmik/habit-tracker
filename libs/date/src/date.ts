import {
	addDays as _addDays,
	addMonths as _addMonths,
	addWeeks as _addWeeks,
	differenceInDays as _differenceInDays,
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
	max,
	min,
} from "date-fns";

import { tz, TZDate } from "@date-fns/tz";

export const WEEKDAYS = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export type IsoDateString = string;
export type DateType = TZDate;

const timeZone = "Europe/Vilnius";
const timeZoneOptions = { in: tz(timeZone) };

export const currentDate = () => new TZDate(new Date(), timeZone);

export const getDate = (date: Date) => new TZDate(date, timeZone);

export const parseISO = (iso: IsoDateString) => _parseISO(iso, timeZoneOptions);

export const convertDateToIso = (date: DateType): IsoDateString =>
	format(date, "yyyy-MM-dd", timeZoneOptions);

export const addDays = (date: DateType, number: number) =>
	_addDays(date, number, timeZoneOptions);

export const addWeeks = (date: DateType, number: number) =>
	_addWeeks(date, number, timeZoneOptions);

export const addMonths = (date: DateType, number: number) =>
	_addMonths(date, number, timeZoneOptions);

export const getDayOfMonthNumber = (date: DateType) =>
	_getDate(date, timeZoneOptions);

/**
 * Mo, Tu, We, ..., Su
 */
export const getWeekdayNameTruncated = (date: DateType) =>
	format(date, "EEEEEE", timeZoneOptions);

export const isAfter = (date: DateType, dateToCompare: DateType) =>
	_isAfter(date, dateToCompare);

export const isBefore = (date: DateType, dateToCompare: DateType) =>
	_isBefore(date, dateToCompare);

export const isSameDay = (dateOne: DateType, dateTwo: DateType) =>
	_isSameDay(dateOne, dateTwo, timeZoneOptions);

export const isToday = (date: DateType) => _isToday(date, timeZoneOptions);

export const startOfToday = () => _startOfToday(timeZoneOptions);

export const startOfDay = (date: DateType) =>
	_startOfDay(date, timeZoneOptions);

export const isValid = (date: IsoDateString) => {
	const parsed = parseISO(date);
	return _isValid(parsed);
};

export const differenceInDays = (laterDate: DateType, earlierDate: DateType) =>
	_differenceInDays(laterDate, earlierDate, timeZoneOptions);

export const getMinDate = (dates: DateType[]) => min(dates, timeZoneOptions);

export const getMaxDate = (dates: DateType[]) => max(dates, timeZoneOptions);
