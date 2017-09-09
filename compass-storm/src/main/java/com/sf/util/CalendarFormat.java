package com.sf.util;

import java.io.PrintStream;
import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class CalendarFormat
  implements Serializable
{
  public static final SimpleDateFormat ymdhmsFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
  public static final SimpleDateFormat ymdFormat = new SimpleDateFormat("yyyy-MM-dd");
  public static final SimpleDateFormat ymFormat = new SimpleDateFormat("yyyyMM");
  public static final SimpleDateFormat y_mFormat = new SimpleDateFormat("yyyy-MM");
  public static final SimpleDateFormat mdyFormat = new SimpleDateFormat("MM/dd/yyyy");
  public static final SimpleDateFormat dmyFormat = new SimpleDateFormat("dd/MM/yyyy");
  public static final SimpleDateFormat dmFormat = new SimpleDateFormat("dd/MM");
  public static final SimpleDateFormat mmddFormat = new SimpleDateFormat("MM-dd");
  public static final SimpleDateFormat HHFormat = new SimpleDateFormat("HH");
  public static final SimpleDateFormat MMddFormat = new SimpleDateFormat("MM dd");
  public static final SimpleDateFormat MMFormat = new SimpleDateFormat("MM");
  public static final SimpleDateFormat ddFormat = new SimpleDateFormat("dd");
  public static final SimpleDateFormat MMyyyyFormat = new SimpleDateFormat("MM yyyy");
  public static final SimpleDateFormat yyyyFormat = new SimpleDateFormat("yyyy");
  public static final SimpleDateFormat yyMMddFormat = new SimpleDateFormat("yyMMdd");
  public static final SimpleDateFormat yyyyMMddFormat = new SimpleDateFormat("yyyyMMdd");
  public static final int NAME_TYPE_FULLNAME = 0;
  public static final int NAME_TYPE_ABBRNAME = 1;
  public static final long INTERVALHOUR = 3600000L;
  public static final long INTERVALDAY = 86400000L;
  public static final long INTERVALWEEK = 604800000L;
  public static final long INTERVALMONTH = 2678400000L;
  public static final String YYYY_MM_DD = "yyyy-MM-dd";
  public static final String YYYYMMDD = "yyyyMMdd";
  public static final String YYYY_MM = "yyyy-MM";
  public static final String YYYYMM = "yyyyMM";

  public static Date getDateTime(String dateMDY)
    throws ParseException
  {
    return mdyFormat.parse(dateMDY);
  }

  public static Date getDateTimeYYYYMMDD(String dateYYYYMMDD)
    throws ParseException
  {
    return yyyyMMddFormat.parse(dateYYYYMMDD);
  }

  public static Date getDateTime(String dateString, SimpleDateFormat sformat)
    throws ParseException
  {
    return null == sformat ? mdyFormat.parse(dateString) : sformat.parse(dateString);
  }

  public static long getLongTimeYYYYMMDD(String dateYYYYMMDD)
    throws ParseException
  {
    return yyyyMMddFormat.parse(dateYYYYMMDD).getTime();
  }

  public static long getLongTime(String dateMDY)
    throws ParseException
  {
    return mdyFormat.parse(dateMDY).getTime();
  }

  public static long getLongTime(String dateString, SimpleDateFormat sformat)
    throws ParseException
  {
    return null == sformat ? mdyFormat.parse(dateString).getTime() : sformat.parse(dateString).getTime();
  }

  public static String getDateString(long clickTime)
  {
    return ymdhmsFormat.format(Long.valueOf(clickTime));
  }

  public static String getDateStringYMD(long clickTime)
  {
    return ymdFormat.format(Long.valueOf(clickTime));
  }

  public static String getDateString(long clickTime, SimpleDateFormat sformat) {
    return null == sformat ? ymdhmsFormat.format(Long.valueOf(clickTime)) : sformat.format(Long.valueOf(clickTime));
  }

  public static long getNow()
  {
    Calendar calendar = Calendar.getInstance();
    calendar.set(11, 0);
    calendar.set(12, 0);
    calendar.set(13, 0);
    calendar.set(14, 0);
    return calendar.getTimeInMillis();
  }

  public static long getLastMonth()
  {
    Calendar calendar = Calendar.getInstance();
    calendar.add(2, -1);
    calendar.set(11, 0);
    calendar.set(12, 0);
    calendar.set(13, 0);
    calendar.set(14, 0);
    return calendar.getTimeInMillis();
  }

  public static String getCurrentDateTime()
  {
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    return simpleDateFormat.format(new Date());
  }

  public static String getCurrentDate()
  {
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
    return simpleDateFormat.format(new Date());
  }

  public static String getYesterday()
  {
    Calendar c = Calendar.getInstance();
    c.add(5, -1);
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
    return simpleDateFormat.format(c.getTime());
  }

  public static long getMonth(int n)
  {
    Calendar calendar = Calendar.getInstance();
    calendar.add(2, n);
    calendar.set(11, 0);
    calendar.set(12, 0);
    calendar.set(13, 0);
    calendar.set(14, 0);
    return calendar.getTimeInMillis();
  }

  public static long getMonth(Date date, int n)
  {
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(date);
    calendar.add(2, n);
    calendar.set(11, 0);
    calendar.set(12, 0);
    calendar.set(13, 0);
    calendar.set(14, 0);
    return calendar.getTimeInMillis();
  }

  public static String getWeekNum(Date date)
  {
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(date);
    calendar.setFirstDayOfWeek(1);
    calendar.setMinimalDaysInFirstWeek(4);
    if (calendar.get(3) < 10) {
      return "0" + calendar.get(3);
    }
    return "" + calendar.get(3);
  }

  public static int getWeekNumInt(Date date)
  {
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(date);
    calendar.setFirstDayOfWeek(1);
    calendar.setMinimalDaysInFirstWeek(4);
    return calendar.get(3);
  }

  public static String getStringCurrentMonth() {
    String currentMonth = getCurrentDate().substring(0, 6);
    return currentMonth;
  }

  public static String getStringLastMonth() {
    Calendar c = Calendar.getInstance();
    c.add(2, -1);
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMM");
    return simpleDateFormat.format(c.getTime());
  }

  public static String getStringNextMonth() {
    Calendar c = Calendar.getInstance();
    c.add(2, 1);
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMM");
    return simpleDateFormat.format(c.getTime());
  }

  public static long getChangDate(int n)
  {
    Calendar calendar = Calendar.getInstance();
    calendar.add(5, n);
    calendar.set(11, 0);
    calendar.set(12, 0);
    calendar.set(13, 0);
    calendar.set(14, 0);
    return calendar.getTimeInMillis();
  }

  public static long getChangDate(Date date, int n) {
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(date);
    calendar.add(5, n);
    calendar.set(11, 0);
    calendar.set(12, 0);
    calendar.set(13, 0);
    calendar.set(14, 0);
    return calendar.getTimeInMillis();
  }

  public static long getThisYear() {
    Calendar calendar = Calendar.getInstance();
    calendar.set(6, 1);
    calendar.set(11, 0);
    calendar.set(12, 0);
    calendar.set(13, 0);
    calendar.set(14, 0);
    return calendar.getTimeInMillis();
  }

  public static String getWeekName(int week) {
    switch (week) {
    case 1:
      return "Sun";
    case 2:
      return "Mon";
    case 3:
      return "Tue";
    case 4:
      return "Wed";
    case 5:
      return "Thu";
    case 6:
      return "Fri";
    case 7:
      return "Sat";
    }
    return "Sun";
  }

  public static String getWeekFullName(int week)
  {
    switch (week) {
    case 1:
      return "Sunday";
    case 2:
      return "Monday";
    case 3:
      return "Tuesday";
    case 4:
      return "Wednesday";
    case 5:
      return "Thursday";
    case 6:
      return "Friday";
    case 7:
      return "Saturday";
    }
    return "Sunday";
  }

  public static String getWeekCnName(int week)
  {
    switch (week) {
    case 1:
      return "星期一";
    case 2:
      return "星期二";
    case 3:
      return "星期三";
    case 4:
      return "星期四";
    case 5:
      return "星期五";
    case 6:
      return "星期六";
    case 7:
      return "星期日";
    }
    return "星期日";
  }

  public static String getMonthName(int month)
  {
    switch (month) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    }
    return "Jan";
  }

  public static String getMonthForFullName(int month)
  {
    switch (month) {
    case 1:
      return "JANUARY";
    case 2:
      return "FEBRUARY";
    case 3:
      return "MARCH";
    case 4:
      return "APRIL";
    case 5:
      return "MAY";
    case 6:
      return "JUNE";
    case 7:
      return "JULY";
    case 8:
      return "AUGUST";
    case 9:
      return "SEPTEMBER";
    case 10:
      return "OCTOBER";
    case 11:
      return "NOVEMBER";
    case 12:
      return "DECEMBER";
    }
    return "JANUARY";
  }

  public static String getMonthName(String strMonth, int nameType)
  {
    int month;
    try {
      month = Integer.parseInt(strMonth.substring(4, 6));
    } catch (Exception e) {
      month = 1;
    }
    String strName = "";
    if (1 == nameType)
      strName = getMonthName(month);
    else if (0 == nameType) {
      strName = getMonthForFullName(month);
    }
    return strName;
  }

  public static String getFullTime(int time) {
    return time < 10 ? "0" + time : String.valueOf(time);
  }

  private static List<String> getList() {
    List aList = new ArrayList();
    String to = getDateString(System.currentTimeMillis(), ymFormat);
    int intTo = Integer.parseInt(to);
    String from = "200712";
    int intFrom = Integer.parseInt(from);

    for (int i = intTo; i >= intFrom; i--)
      if ((i % 100 <= 12) && (i % 100 != 0))
      {
        aList.add(i + "");
      }
    return aList;
  }

  public static long getMonday(String date)
  {
    long dateInt = 0L;
    try {
      dateInt = getLongTimeYYYYMMDD(date);
      int dayOfWeek = getDayOfWeek(date).intValue() - 1;
      dateInt -= dayOfWeek * 24 * 60 * 60 * 1000;
    } catch (ParseException e) {
      e.printStackTrace();
    }
    return dateInt;
  }

  public static Calendar genMonday(String date)
  {
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    Date d = null;
    try {
      d = format.parse(date);
    } catch (Exception e) {
      e.printStackTrace();
    }
    Calendar cal = Calendar.getInstance();
    cal.setTime(d);

    cal.set(7, 2);
    return cal;
  }

  public static long getSunday(String date)
  {
    long dateInt = 0L;
    try {
      dateInt = getLongTimeYYYYMMDD(date);
      int dayOfWeek = 7 - getDayOfWeek(date).intValue();
      dateInt += dayOfWeek * 24 * 60 * 60 * 1000;
    } catch (ParseException e) {
      e.printStackTrace();
    }
    return dateInt;
  }

  public static String getWeek(String date) {
    String week = getWeekCnName(getDayOfWeek(date).intValue());
    return week;
  }

  private static Integer getDayOfWeek(String date)
  {
    int DateOfWeek = 0;
    try {
      DateOfWeek = getDateTimeYYYYMMDD(date).getDay();
      if (DateOfWeek == 0)
        DateOfWeek = 7;
    }
    catch (Exception e) {
      e.printStackTrace();
    }
    return Integer.valueOf(DateOfWeek);
  }

  public static String getCurrentFormatDate(String format)
  {
    SimpleDateFormat sdf = new SimpleDateFormat(format);
    Calendar c = Calendar.getInstance();
    return sdf.format(c.getTime());
  }

  public static String getFirstDayOfMonth()
  {
    Calendar c = Calendar.getInstance();
    c.set(5, 1);
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
    return simpleDateFormat.format(c.getTime());
  }

  public static String switchFormatDate(String formatDate, String fromFormat, String toFormat)
  {
    try
    {
      SimpleDateFormat sdf = new SimpleDateFormat(fromFormat);
      Date date = sdf.parse(formatDate);
      sdf = new SimpleDateFormat(toFormat);
      return sdf.format(date);
    }
    catch (Exception e) {
    }
    return null;
  }

  public static String getYearWeek(String dateString, String fromFormat)
  {
    try
    {
      SimpleDateFormat df = new SimpleDateFormat(fromFormat);
      return dateString.substring(0, 4) + getWeekNum(df.parse(dateString));
    }
    catch (Exception e) {
    }
    return null;
  }

  public static List<String> getyyyyMMddList(String fromDateString, String endDateString) {
    List list = null;
    try {
      Date fromDate = ymdFormat.parse(fromDateString);
      Date endDate = ymdFormat.parse(endDateString);
      Calendar fromCa = Calendar.getInstance();
      fromCa.setTime(fromDate);
      Calendar endCa = Calendar.getInstance();
      endCa.setTime(endDate);
      list = new ArrayList();
      while ((fromCa.before(endCa)) || (fromCa.equals(endCa))) {
        list.add(ymdFormat.format(fromCa.getTime()));
        fromCa.add(5, 1);
      }
      return list;
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  public static List<String> getYearWeekList(String fromDateString, String endDateString) {
    List list = null;
    try {
      Date fromDate = ymdFormat.parse(fromDateString);
      Date endDate = ymdFormat.parse(endDateString);
      Calendar fromCa = Calendar.getInstance();
      fromCa.setTime(fromDate);
      Calendar endCa = Calendar.getInstance();
      endCa.setTime(endDate);
      list = new ArrayList();
      while ((fromCa.before(endCa)) || (fromCa.equals(endCa))) {
        list.add(getYearWeek(ymdFormat.format(fromCa.getTime()), "yyyy-MM-dd"));
        fromCa.add(5, 7);
      }
      return list;
    } catch (Exception e) {
    }
    return null;
  }

  public static List<String> getYearMonthList(String fromDateString, String endDateString) {
    List list = null;
    try {
      Date fromDate = y_mFormat.parse(fromDateString);
      Date endDate = y_mFormat.parse(endDateString);
      Calendar fromCa = Calendar.getInstance();
      fromCa.setTime(fromDate);
      Calendar endCa = Calendar.getInstance();
      endCa.setTime(endDate);
      list = new ArrayList();
      while ((fromCa.before(endCa)) || (fromCa.equals(endCa))) {
        list.add(ymFormat.format(fromCa.getTime()));
        fromCa.add(2, 1);
      }
      return list;
    } catch (Exception e) {
    }
    return null;
  }

  public static int getMonths(Date date1, Date date2) {
    int iMonth = 0;
    int flag = 0;
    try {
      Calendar objCalendarDate1 = Calendar.getInstance();
      objCalendarDate1.setTime(date1);

      Calendar objCalendarDate2 = Calendar.getInstance();
      objCalendarDate2.setTime(date2);

      if (objCalendarDate2.equals(objCalendarDate1))
        return 0;
      if (objCalendarDate1.after(objCalendarDate2)) {
        Calendar temp = objCalendarDate1;
        objCalendarDate1 = objCalendarDate2;
        objCalendarDate2 = temp;
      }
      if (objCalendarDate2.get(5) < objCalendarDate1.get(5)) {
        flag = 1;
      }
      if (objCalendarDate2.get(1) > objCalendarDate1.get(1)) {
        iMonth = (objCalendarDate2.get(1) - objCalendarDate1.get(1)) * 12 + objCalendarDate2.get(2) - flag - objCalendarDate1.get(2);
      }
      else
        iMonth = objCalendarDate2.get(2) - objCalendarDate1.get(2) - flag;
    }
    catch (Exception e) {
      e.printStackTrace();
    }
    return iMonth;
  }

  public static int getMonth(Date date1, Date date2) {
    int iMonth = 0;
    int flag = 0;
    try {
      Calendar objCalendarDate1 = Calendar.getInstance();
      objCalendarDate1.setTime(date1);

      Calendar objCalendarDate2 = Calendar.getInstance();
      objCalendarDate2.setTime(date2);

      if (objCalendarDate2.equals(objCalendarDate1))
        return 0;
      if (objCalendarDate1.after(objCalendarDate2)) {
        Calendar temp = objCalendarDate1;
        objCalendarDate1 = objCalendarDate2;
        objCalendarDate2 = temp;
      }

      if (objCalendarDate2.get(1) > objCalendarDate1.get(1)) {
        iMonth = (objCalendarDate2.get(1) - objCalendarDate1.get(1)) * 12 + objCalendarDate2.get(2) - objCalendarDate1.get(2) + 1;
      }
      else
        iMonth = objCalendarDate2.get(2) - objCalendarDate1.get(2) + 1;
    }
    catch (Exception e) {
      e.printStackTrace();
    }
    return iMonth;
  }

  public static String getYM(int i)
  {
    try
    {
      Calendar ca = Calendar.getInstance();
      ca.add(5, -i);
      return ymFormat.format(ca.getTime());
    } catch (Exception e) {
    }
    return null;
  }

  public static String getYM(Date time) {
    return ymFormat.format(time);
  }

  public static String getYMAddMonth(int i)
  {
    try
    {
      Calendar ca = Calendar.getInstance();
      ca.add(2, -i);
      return ymFormat.format(ca.getTime());
    } catch (Exception e) {
    }
    return null;
  }

  public static String getYmd(int i)
  {
    try
    {
      Calendar ca = Calendar.getInstance();
      ca.add(5, -i);
      return ymdFormat.format(ca.getTime());
    } catch (Exception e) {
    }
    return null;
  }

  public static String getYmdAdd(String formatDate, String fromFormat, int i) {
    SimpleDateFormat sdf = new SimpleDateFormat(fromFormat);
    try {
      Date date = sdf.parse(formatDate);
      Calendar ca = Calendar.getInstance();
      ca.setTime(date);
      ca.add(5, -i);
      return sdf.format(ca.getTime()); } catch (ParseException e) {
    }
    return null;
  }

  public static String getyyyyMMdd(int i)
  {
    try {
      Calendar ca = Calendar.getInstance();
      ca.add(5, -i);
      return yyyyMMddFormat.format(ca.getTime());
    } catch (Exception e) {
    }
    return null;
  }

  public static int daysBetween(String fromDate, String endDate) {
    try {
      Date smdate = ymdFormat.parse(fromDate);
      Date bdate = ymdFormat.parse(endDate);
      Calendar cal = Calendar.getInstance();
      cal.setTime(smdate);
      long time1 = cal.getTimeInMillis();
      cal.setTime(bdate);
      long time2 = cal.getTimeInMillis();
      long between_days = (time2 - time1) / 86400000L;
      return Integer.parseInt(String.valueOf(between_days)); } catch (Exception e) {
    }
    return 0;
  }

  public static void main(String[] args)
    throws ParseException
  {
    System.out.println(getSecondsBetweenNowAndTomorrow());
  }

  public static int getSecondsBetweenNowAndTomorrow() {
    try {
      Calendar ca = Calendar.getInstance();
      long nowTime = ca.getTimeInMillis();
      ca.add(5, 1);
      ca.set(11, 0);
      ca.set(12, 0);
      ca.set(13, 0);
      long lastTime = ca.getTimeInMillis();
      return (int)((lastTime - nowTime) / 1000L); } catch (Exception e) {
    }
    return 0;
  }
}