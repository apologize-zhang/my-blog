'use strict';

angular.module('myApp')
    .service('DateUtils', function ($filter) {

        this.convertLocaleDateToServer = function (date) {
            if (date) {
                return $filter('date')(date, 'yyyy-MM-dd');
            } else {
                return null;
            }
        };

        this.convertLocaleDateFromServer = function (date) {
            if (date) {
                var dateString = date.split("-");
                return new Date(dateString[0], dateString[1] - 1, dateString[2]);
            }
            return null;
        };

        this.convertDateTimeFromServer = function (date) {
            if (date) {
                return new Date(date);
            } else {
                return null;
            }
        };

        // common date format for all date input fields
        this.dateformat = function () {
            return 'yyyy-MM-dd';
        };


        /**
         * 时间工具类
         */

        // 增加天
        this.AddDays = function(date, value) {
            date.setDate(date.getDate() + value);
        };

        // 增加月
        this.AddMonths = function (date, value) {
            date.setMonth(date.getMonth() + value);
        };

        // 增加年
        this.AddYears = function AddYears(date, value) {
            date.setFullYear(date.getFullYear() + value);
        };

        // 是否为今天
        this.IsToday = function (date) {
            return IsDateEquals(date, new Date());
        };

        // 是否为当月
        this.IsThisMonth = function (date) {
            return IsMonthEquals(date, new Date());
        };

        // 两个日期的年是否相等
        this.IsMonthEquals = function (date1, date2) {
            return date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear();
        };

        // 判断日期是否相等
        this.IsDateEquals = function (date1, date2) {
            return date1.getDate() == date2.getDate() && IsMonthEquals(date1, date2);
        };

        // 返回某个日期对应的月份的天数
        this.GetMonthDayCount = function (date) {
            switch (date.getMonth() + 1) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    return 31;
                case 4:
                case 6:
                case 9:
                case 11:
                    return 30;
            }
            //feb:
            date = new Date(date);
            var lastd = 28;
            date.setDate(29);
            while (date.getMonth() == 1) {
                lastd++;
                AddDays(date, 1);
            }
            return lastd;
        };

        // 返回两位数的年份
        this.GetHarfYear = function (date) {
            var v = date.getYear();
            if (v > 9)return v.toString();
            return "0" + v;
        };

        // 返回月份（修正为两位数）
        this.GetFullMonth = function (date) {
            var v = date.getMonth() + 1;
            if (v > 9)return v.toString();
            return "0" + v;
        };

        // 返回日 （修正为两位数）
        this.GetFullDate = function (date) {
            var v = date.getDate();
            if (v > 9)return v.toString();
            return "0" + v;
        };

        // 替换字符串
        this.Replace = function (str, from, to) {
            return str.split(from).join(to);
        };

        // 格式化日期的表示
        this.FormatDate = function FormatDate(date, str) {
            str = Replace(str, "yyyy", date.getFullYear());
            str = Replace(str, "MM", GetFullMonth(date));
            str = Replace(str, "dd", GetFullDate(date));
            str = Replace(str, "yy", GetHarfYear(date));
            str = Replace(str, "M", date.getMonth() + 1);
            str = Replace(str, "d", date.getDate());
            return str;
        };

        // 统一日期格式
       this.ConvertDate =  function (str) {
            str = (str + "").replace(/^\s*/g, "").replace(/\s*$/g, ""); // 去除前后的空白
            var d;
            if (/^[0-9]{8}$/.test(str)) // 20040226 -> 2004-02-26
            {
                d = new Date(new Number(str.substr(0, 4)), new Number(str.substr(4, 2)) - 1, new Number(str.substr(6, 2)));
                if (d.getTime())return d;
            }
            d = new Date(str);
            if (d.getTime())return d;
            d = new Date(Replace(str, "-", "/"));
            if (d.getTime())return d;
            return null;
        };

        /**
         * 获得当前日期周一时间
         * @returns {Date}
         */
        this.getWeekFirstDay =  function (date)
        {
            if(date.getDay() === 0 ){
                return new Date(date-(6*86400000));
            }
            return new Date(date-(date.getDay()-1)*86400000);
        };

        /**
         * 获得当前日期周末时间
         * @returns {Date}
         */
        this.getWeekLastDay =  function (date)
        {
            var WeekFirstDay= this.getWeekFirstDay(date);
            var WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
            return WeekLastDay;
        };

        /**
         * 获得当前日期月头时间
         * @returns {Date}
         */
        this.getMonthFirstDay =  function (date)
        {

            var firstDate = new Date(date);
            firstDate.setDate(1); //第一天

            return firstDate;
        };

        /**
         * 获得当前日期月末时间
         * @returns {Date}
         */
        this.getMonthLastDay =  function (date)
        {
            var firstDate= this.getMonthFirstDay(date);
            var endDate = new Date(firstDate);
            endDate.setMonth(firstDate.getMonth()+1);
            endDate.setDate(0);

            return endDate;
        };

        /**
         * 根据 年-月-日 获取unix时间戳
         * @param date
         */
        this.getTimeStamp = function(date) {
            return moment(date.format("YYYY-MM-DD")).valueOf();
        };

        /**
         * 相差天数(d1-d2)
         * @param d1
         * @param d2
         * @returns {*}
         */
        this.dateDiffDay = function (d1, d2) {
            var day = 24 * 60 * 60 * 1000;
            try {
                var checkDate = d1;
                var checkTime = checkDate.getTime();

                var checkDate2 = d2;
                var checkTime2 = checkDate2.getTime();

                var cha = (checkTime - checkTime2) / day;
                return cha;
            } catch (e) {
                return false;
            }
        };

        /**
         * 相差月数 (beginDate - endDate)
         * @param beginDate
         * @param endDate
         * @returns {number}
         */
        this.dateDiffMonth = function(beginDate, endDate) {
            var beginMonth = beginDate.getMonth();
            var endMonth = endDate.getMonth() + (endDate.getYear() - beginDate.getYear()) * 12;

            return endMonth - beginMonth;
        };

        /**
         * 判断指定的日期和比较日期相同
         *
         * @param date
         * @param comparer
         */
        this.isSame = function(date, comparer) {

            var _date = parseInt(date.format('YYYYMMDD'), 10);
            var _compare = parseInt(comparer.format('YYYYMMDD'), 10);

            return _date === _compare;
        };

        /**
         * 判断指定的日期在比较日期之前
         *
         * @param date
         * @param comparer
         */
        this.isBefore = function(date, comparer) {

            var _date = parseInt(date.format('YYYYMMDD'), 10);
            var _compare = parseInt(comparer.format('YYYYMMDD'), 10);

            return _date < _compare;
            //return date.isBefore(comparer);
        };

        /**
         * 判断指定的日期在比较日期之后
         *
         * @param date
         * @param comparer
         */
        this.isAfter = function(date, comparer) {

            var _date = parseInt(date.format('YYYYMMDD'), 10);
            var _compare = parseInt(comparer.format('YYYYMMDD'), 10);

            return _date > _compare;
            //return date.isAfter(comparer);
        };

        /**
         * 判断指定的日期是否在指定起止范围之内
         * TODO 直接使用moment js的isBefore和isAfter方法，在DEV环境时间比较会差一天的GAP 相同的代码localhost本地环境不会出现问题
         * TODO 需要调查以上原因，现在修改方式是转成Int比较
         *
         * @param date 日期
         * @param from 开始
         * @param to 结束
         *
         * @returns {*}
         */
        this.isDayInRange = function(date, from, to) {
            return !(this.isBefore(date, from) || this.isAfter(date, to));
        };


        /**
         * 判断是否在同一个月
         * @param date
         * @param comparer
         * @returns {boolean}
         */
        this.isSameMonth = function(date, comparer) {
            if(date.getYear() != comparer.getYear()) {
                return false;
            }

            var _dateMonth = Number(date.getMonth());
            var _comparerMonth = Number(comparer.getMonth());

            return _dateMonth === _comparerMonth;
        };

        /**
         * 判断两个时间是否在同一个季度
         * @param date
         * @param comparer
         */
        this.isSameQuarter = function(date, comparer) {

            if(date.getYear() != comparer.getYear()) {
                return false;
            }

            var _dateMonth = Number(date.getMonth());
            var _comparerMonth = Number(comparer.getMonth());

            return parseInt(_dateMonth / 3) === parseInt(_comparerMonth / 3);
        };

        /**
         * 获取两个日期之间的天的集合。
         * @param from
         * @param to
         * @param format
         */
        this.getRangeDays = function(from, to, format) {

            var days = [];

            var _tmp = angular.copy(from);

            while(!this.isAfter(moment(_tmp), moment(to))) {
                if(angular.isUndefinedOrNull(format)) {
                    days.push(angular.copy(_tmp));
                } else {
                    days.push(angular.copy(moment(_tmp)).format(format));
                }

                this.AddDays(_tmp, 1);
            }

            return days;
        };

    });
