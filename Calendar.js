class Calendar
	{
	constructor(params)
		{
		this.warpper = null;
		this.monthData = null;
		this.params = params;
		this.init(this.params);
		}

	init(params)
		{
		this.warpper = params.dom;
		this.render("", params);

		var thisCalendar = this;

		this.warpper.addEventListener("click", function (e)
			{
			var $target = e.target;
			if ($target.classList.contains("calendar_prev_date_btn"))
				{
				thisCalendar.render("prev");
				}
			else if ($target.classList.contains("calendar_prev_date_btn_2"))
				{
				thisCalendar.render("prev");
				}
			else if ($target.classList.contains("calendar_next_date_btn"))
				{
				thisCalendar.render("next");
				}
			else if ($target.classList.contains("calendar_next_date_btn_2"))
				{
				thisCalendar.render("next");
				}
			}, false);
		}

	getMonthData(year, month, day)
		{
		var year, month, day;
		var ret = [];

		if (!year || !month)
			{
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
			day = today.getDay();
			}

		var firstDay = new Date(year, month - 1, 1);
		var firstDayWeekDay = firstDay.getDay();
		if (firstDayWeekDay === 0)
			{
			firstDayWeekDay = 7;
			}

		year = firstDay.getFullYear();
		month = firstDay.getMonth() + 1;

		var lastDayOfLastMonth = new Date(year, month - 1, 0);
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
		var preMonthDayCount = firstDayWeekDay - 1;
		var lastDay = new Date(year, month, 0);
		var lastDate = lastDay.getDate()
		var styleCls = "";

		for (var i = 0; i < 7 * 6; i++)
			{
			var date = i + 1 - preMonthDayCount;
			var showDate = date;
			var thisMonth = month;

			if (date <= 0)
				{
				thisMonth = month - 1;
				showDate = "";
				styleCls = "calendar_gray";
				}
			else if (date > lastDate)
				{
				thisMonth = month + 1;
				showDate = showDate - lastDate;
				styleCls = "nothing";
				}
			else
				{
				var today = new Date();
				if (showDate === day && thisMonth === today.getMonth() + 1 && year == today.getFullYear())
					{
					styleCls = "calendar_current";
					}
					else
					{
					styleCls = "calendar_normal";
					}
				}

			if (thisMonth === 13)
				{
				thisMonth = 1;
				}
			else if (thisMonth === 0)
				{
				thisMonth = 12;
				}

			ret.push({month: thisMonth,date: date,showDate: showDate,styleCls: styleCls});
			}

		return{year: year,month: month,date: ret, day:day};
		}

	render(direction, params)
		{
		var year, month, day;
		if (this.monthData)
			{
			year = this.monthData.year;
			month = this.monthData.month;
			day = this.monthData.day;
			}
			else
			{
			year = params.year;
			month = params.month;
			day = params.day;
			}

		if (direction === "prev")
			{
			month--;
			if (month === 0)
				{
				month = 12;
				year--;
				}
			}
		else if (direction === "next")
			{
			month++;
			}

		var html = this.buildUI(year, month, day);
		this.warpper.innerHTML = html;
		}

	buildUI(year, month, day)
		{
		this.monthData = this.getMonthData(year, month, day);
		this.dayWords = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
		this.enMonthsWords = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		var html = "";
		html += "<div class='calendar_date_picker_warpper'>";

		html += "<div class='calendar_date_picker_header'>";

		html += "<a class='calendar_prev_date_btn'>";
		html += "<svg height='24' width='24' version='1.1' class='calendar_prev_date_btn_2' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path class='calendar_prev_date_btn_2' d='M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z'></path></svg>";
		html += '</a>';

		html += "<span class='calendar_date_title'>" + this.enMonthsWords[this.monthData.month - 1] + " " + this.monthData.year + "</span>";

		html += "<a class='calendar_next_date_btn'>";
		html += "<svg height='24' width='24' version='1.1' class='calendar_next_date_btn_2' viewbox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path class='calendar_next_date_btn_2' d='M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z'></path></svg>";
		html += '</a>';

		html += "</div>";

		html += "<div class='calendar_date_picker_body'>";
		html += "<table class='calendar_date_picker_table'><thead><tr>";

		for (var i = 0; i < this.dayWords.length; i++)
			{
			html += "<th>" + this.dayWords[i] + "</th>";
			}

		html += "</tr></thead><tbody>";

		var started = false;

		for (var i = 0; i < this.monthData.date.length; i++)
			{
			if (i % 7 === 0)
				{
				if (this.monthData.date[i].styleCls!="nothing")
					{
					html += "<tr>";
					started = true;
					}
					else
					{
					started = false;
					}
				}

			if (this.monthData.date[i].styleCls=="nothing")
				{
				if (started==true)
					{
					html += "<td class='calendar_gray'></td>";
					}
				}
				else
				{
				if (started==true)
					{
					html += "<td class='" + this.monthData.date[i].styleCls + "'>" + this.monthData.date[i].showDate + "</td>";
					}
				}

			if (i % 7 === 6)
				{
				if (started==true)
					{
					html += "</tr>";
					}
				}
			}

		html += "</tbody></table></div></div>";

		return html;
		}
	}