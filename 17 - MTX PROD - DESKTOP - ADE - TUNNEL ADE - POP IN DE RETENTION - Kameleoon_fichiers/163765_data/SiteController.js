var SiteController =
{
	graphColorsMap:
	{
		"gray": "158,158,158",
		"pink": "255,126,171",
		"duckGreen": "54,123,118",
		"orange": "240,135,0",
		"blue": "33,150,243",
		"red": "170,30,0",
		"anisGreen": "130,153,28",
		"darkBlue": "0,95,161",
		"violet": "93,32,103"
	},

	colorsListWithoutGray: ["blue", "orange", "pink", "duckGreen", "darkBlue", "red" , "anisGreen", "violet"],


	updateFilterVentilation: function(filterVentilation)
	{
		if (! SiteController.filterVentilationList)
		{
			SiteController.filterVentilationList = {};
		}
		SiteController.filterVentilationList[filterVentilation.rank + "_" + filterVentilation.goalId] = filterVentilation;
		SiteController.filterVentilationList[filterVentilation.rank + "_" + filterVentilation.goalId].init();
		SiteController.setupSelectBox("#"+filterVentilation.rank+"_"+filterVentilation.goalId+" .FVWidget.filters-selectbox");
		SiteController.setupSelectBox("#"+filterVentilation.rank+"_"+filterVentilation.goalId+" .FVWidget.ventilations-selectbox");
	},

	updateTestTableLoader: function(testTableLoader, goalId, rank)
	{
		if (! SiteController.testTableLoaderList)
		{
			SiteController.testTableLoaderList = {};
		}
		var barChartLoaderListKey = "KAMELEOON_" + goalId + "_" + rank;
		SiteController.testTableLoaderList[barChartLoaderListKey] = testTableLoader;
	},

	updateBarChartLoader: function(barChartLoader, goalId, rank)
	{
		if (! SiteController.barChartLoaderList)
		{
			SiteController.barChartLoaderList = {};
		}
		var barChartLoaderListKey = "KAMELEOON_" + goalId + "_" + rank;
		SiteController.barChartLoaderList[barChartLoaderListKey] = barChartLoader;
		SiteController.barChartLoaderList[barChartLoaderListKey].setupData(goalId, rank);
		SiteController.barChartLoaderList[barChartLoaderListKey].adjustScrollArrow(goalId, rank);
	},

	generateSampleChart: function(target)
	{
		var dataSet = null;

		var graphColorsMap =
		{
			"gray": "163,173,193",
			"pink":"255,126,171",
			"green":"129,199,132",
			"orange":"255,183,77",
			"blue":"33,150,243"
		};

		var dataMapList = [];

		dataMapList.push(
		{
			fillColor: "rgba(" + graphColorsMap["blue"] + ", 0.1)",
			strokeColor: "rgba(" + graphColorsMap["blue"] + ",0.2)",
			pointColor: "rgba(" + graphColorsMap["blue"] + ",0.2)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(" + graphColorsMap["blue"] + ", 0.2)",
			data : [6, 5, 3, 8, 7],
			title: "&#" + (66) + ";"
		});

		dataMapList.push(
		{
			fillColor: "rgba(" + graphColorsMap["gray"] + ", 0.1)",
			strokeColor: "rgba(" + graphColorsMap["gray"] + ",0.2)",
			pointColor: "rgba(" + graphColorsMap["gray"] + ",0.2)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(" + graphColorsMap["gray"] + ", 0.2)",
			data : [8, 2, 3, 1, 4],
			title: "&#" + (67) + ";"
		});

		var linedata =
		{
			labels : ["", "", "", "", ""],
			datasets : dataMapList
		};

		if (document.getElementById(target)) {
			new Chart(document.getElementById(target).getContext("2d")).Line(linedata,
			{
				"xAxisBottom": false,
				"animationSteps": 10,
				"yAxisLeft": false,
				"roundNumber": -2,
				"pointDot" : true,
				"scaleShowLabels": false,
				"showTooltips": false,
				"bezierCurve" : false,
				"labelsFilter": function (value, index)
				{
					return (index > 0);
				}
			});
		}

		$(".vertical-legend").html("No data available");
	},

	processValue: function(leftValue, rightValue)
	{
		return parseFloat(leftValue + "." + this.preprocessValue(rightValue));
	},

	removeSpaceForString: function(stringValue)
	{
		var numberValue = parseInt(stringValue.replace(/&nbsp;/gi,''));
		return numberValue;
	},

	processLongValue: function(leftValue, rightValue)
	{
		return parseFloat(this.removeComma(leftValue) + this.removeComma(rightValue));
	},

	removeComma: function(value)
	{
		return value ? value.replace(/,/gi, '') : '';
	},

	preprocessValue: function(value)
	{
		var result = value;
		if (value.match("%"))
		{
			var indexToRemove = value.indexOf("%");
			result = value.substring(1, value.length-1);
		}
		else if (value.match("/"))
		{
			var indexToRemove = value.indexOf("/");
			result = value.slice(0, indexToRemove) + value.slice(indexToRemove+1, value.length);
		}
		else if ("-" == value)
		{
			result = 0;
		}
		else
		{
			result = value.substring(1);
		}
		return result;
	},

	removePercentage: function(value)
	{
		var result = value;

		if (value.match("%"))
		{
			var indexToRemove = value.indexOf("%");
			result = value.slice(0, indexToRemove);
		}
		return result;
	},

	toggleRowForDimension: function(target_row, dimension)
	{
		switch(dimension)
		{
			case "bayesianProbability-data":
				target_row.nextAll(".bayesianProbability-data").toggle();
				break;
			case "bayesianReliabilityLevel-data":
				target_row.nextAll(".bayesianReliabilityLevel-data").toggle();
				break;
			case "improvement-data":
				target_row.nextAll(".improvement-data").toggle();
				break;
			case "statisticalResult-data":
				target_row.nextAll(".statisticalResult-data").toggle();
				break;
			case "conversion-data":
				target_row.nextAll(".conversion-data").toggle();
				break;
			case "conversionRate-data":
				target_row.nextAll(".conversionRate-data").toggle();
				break;
			case "allConversions-data":
				target_row.nextAll(".allConversions-data").toggle();
				break;
			case "convertedVisits-data":
				target_row.nextAll(".convertedVisits-data").toggle();
				break;
			case "visit-data":
				target_row.nextAll(".visit-data").toggle();
				break;
			case "visits-data":
				target_row.nextAll(".visits-data").toggle();
				break;
			case "conversions-data":
				target_row.nextAll(".conversions-data").toggle();
				break;
			case "revenue-data":
				target_row.nextAll(".revenue-data").toggle();
				break;
			case "averageBasket-data":
				target_row.nextAll(".averageBasket-data").toggle();
				break;
			default:
		}
	},

	setupAlertsMenu: function()
	{
		if ($(".kameleoonAlertsDropdown.open").length > 0)
		{
			$(".kameleoonAlertsDropdown .kameleoonAlert").hide();

			$(".kameleoonAlertsDropdownFirstLi").click(function(event)
			{
				$(".kameleoonAlertsDropdown .kameleoonAlert").show();
				SiteController.acknowledgeAlerts();
				event.stopPropagation();
			});

			$(".kameleoonAlertsDropdown").click(function(event)
			{
				$(".kameleoonAlertsDropdown .kameleoonAlert").show();
			});
		}

		$(".dropdown-menu.alerts .close-notification").click(function(event)
		{
			$(".kameleoonAlertsDropdown .dropdown-menu.alerts").dropdown("toggle");
			event.stopPropagation();
		});

		$(".dropdown-alert li.list-item").click(function(event)
		{
			SiteController.acknowledgeAlerts();
		});
	},

	acknowledgeAlerts: function()
	{
		if (!this.alreadyAcknowledgedAlerts)
		{
			this.alreadyAcknowledgedAlerts = true;
			$(".kameleoonAlertsDropdown .dropdown-toggle").removeClass("icon-alerts-full").addClass("icon-alerts-empty");
			$.ajax(
			{
				"type": 'GET', "url": '/abTest/acknowledgeAllAlerts'
			});
			event.stopPropagation();
			event.preventDefault();
		}
	},

	setupSignupForm: function(levelAccount)
	{
		$("#showTermsOfUse").click(function(event)
		{
			$("#termOfUseWrapper").show();
		});

		$("#closeTermsOfUse").click(function(event)
		{
			$("#termOfUseWrapper").hide();
		});

	},

	selectPlan: function(event, targetElement)
	{

	},

	selectPack: function(selectedPack)
	{

	},

	showValue: function(newValue)
	{

	},

	calculatePrice: function(value)
	{

	},

	calculDifference: function(value, num, multip, tranche)
	{
	},

	successCheckScreenshotJob: function(data)
	{
		window.location.replace(data.url);
	},

	/** Personalization */

	setupSitesVizualisation: function()
	{
//		$$(".PersonalizationRow").forEach(function (element)
//		{
//			if (! element.className.match("Show"))
//			{
//				element.hide();
//			}
//		});
	},

	showManagePersonalization: function(siteId)
	{
//		if ($$("#personalizationRow" + siteId).first().style.display == "none")
//		{
//			$$("#personalizationRow" + siteId).first().show();
//		}
//		else
//		{
//			$$("#personalizationRow" + siteId).first().hide();
//		}
	},

	showHideAllSegments: function(element)
	{
//		if (element.checked)
//		{
//			$$(".HiddenSegment").forEach(function (element)
//			{
//				element.show();
//			});
//		}
//		else
//		{
//			$$(".HiddenSegment").forEach(function (element)
//			{
//				element.hide();
//			});
//		}
	},

	/** Setup back-office layout */

	/** target and popup are jquery elements */
	displayHelpPopup: function(icon)
	{

		$(".bo-arrow-info").hide();
		var targetPopup = $("." + icon.attr("value")).find(".bo-arrow-info");

		if (targetPopup.length == 0)
		{
			targetPopup = $("." + icon.attr("value") + ".bo-arrow-info");
		}
		else
		{
			targetPopup.addClass(icon.attr("value"));
		}

		if (targetPopup.parent().get(0) != $("body").get(0))
		{
			targetPopup.detach();
			$("body").append(targetPopup);
			targetPopup.css("position", "absolute");
		}

		var targetElementContainer = icon.parent().closest("div");
		var targetElement = icon.parent().closest("div").find(".form-control");

		if (targetElementContainer.hasClass("checkbox"))
		{
			targetElement = icon;
		}

		var width, height, top, left;

		width = targetElement.width();
		height = targetElement.height();

		top = targetElement.offset().top;
		left = targetElement.offset().left;

		targetPopup.show();
		var targetPopupContent = targetPopup.find(".arrow-info");
		targetPopup.css("top", (top - (targetPopupContent.height() / 2)) + "px");
		targetPopup.css("left", (left + width + 10 + 28) + "px");

		targetPopup.click(function()
		{
			$(this).hide();
		});
	},

	isAValidUrl: function(url)
	{
		if (/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url))
		{
			return true;
		}
		else
		{
			return false;
		}
	},

	displayStatisticalSignificancePopup: function()
	{

	},

	cancelReportingConfiguration: function()
	{
        window.location.href = "/configuration/integrations";
	},

	setupSelectBox: function(target)
	{
		var targetElement = $(target);
		var targetClass = target;

		targetElement.find("li.list-item.selectable").click(function()
		{

			var target = $(this).closest(".selectbox").attr("target");
			target = $(this).closest(".selectbox").parent().find("input#" + target);

			var value = $(this).attr("value");
			if (! value)
			{
				value = $(this).html();
			}
			target.attr("value", value);

			$(this).closest("ul").find("li").removeAttr("selected");
			$(this).attr("selected", "selected");

			var label = $(this).closest(".selectbox-label");
			if (label)
			{
				var ventilationOption = $(this).html();
				if(ventilationOption.indexOf("&amp;") >= 0)
				{
					ventilationOption = ventilationOption.replace("&amp;", "&");
				}
				if(targetClass == ".goals-selectbox")
				{
					label.find(".selectbox-label-text").html(ventilationOption);
				}
				else
				{
					label.find(".selectbox-label-text").text(ventilationOption);
				}

			}
		});
	},

	setupMenusAndDialogs: function()
	{
		$(".backoffice-dialog .dialog-footer .action-button.cancel").click(function()
		{
			$(".backoffice-dialog").fadeOut();
			$("#backoffice-overlay").fadeOut();
		});
		$(".backoffice-dialog .dialog-footer .action-button.close").click(function()
		{
			$(".backoffice-dialog").fadeOut();
			$("#backoffice-overlay").fadeOut();
		});

		$(".backoffice-dialog .dialog-footer .action-button.validate").click(function()
		{
			$(".backoffice-dialog .dialog-body form").submit();
		});

		$("[target-popup]").click(function()
		{
			SiteController.fixSelectBoxHeights();
			$("#backoffice-overlay").fadeIn();
			$($(this).attr("target-popup")).fadeIn();
		});

		$("#backoffice-overlay").click(function()
		{
			$(".backoffice-dialog").fadeOut();
			$("#backoffice-overlay").fadeOut();
		});

		$(".selectbox li.list-item.selectable").click(function()
		{
			var target = $(this).closest(".selectbox").attr("target");

			if (target)
			{
				target = $(this).closest(".selectbox").parent().find("input#" + target);
				var value = $(this).attr("value");
				if (! value)
				{
					value = $(this).html();
				}
				target.attr("value", value);
			}

			$(this).closest("ul").find("li").removeAttr("selected");
			$(this).attr("selected", "selected");

			var label = $(this).closest(".selectbox-label");
			if (label)
			{
				label.find(".selectbox-label-text").text($(this).html());
			}
		});
	},

	fixSelectBoxHeights: function()
	{
		$(".top-opening").each(function()
		{
			var height = (($(this).find("li.dropdown-label>ul>li").length * 40) + 30) < 310 ? (($(this).find("li.dropdown-label>ul>li").length * 40) + 30) : 310;
			$(this).find("li.dropdown-label>ul").css("top", "-" + height + "px");
		});
	},

	setupListExperimentsActions: function()
	{
		$(".load-editor").click(function(e)
		{
			var targetWindow = window.open();
			var experimentId = $(this).closest("form").find("input[name='experimentId']").val();
			targetWindow.location.href = "/abTest/loadEditor?id=" + experimentId;
		});
	},

	setupTestActions: function()
	{
		$(".copy-into-site").click(function(e)
		{

			e.preventDefault();

			$('.copy-variation').hide();

			$('#confirm-copy-popup').css("height", "370px");
			$('#confirm-copy-popup .popup-body').css("height", "220px");
			$('#confirm-copy-popup').show();

			var experimentName = $(this).closest("form").find(".experiment-name").val();
			var siteId = $(this).attr("value");
			var experimentId = $(this).closest("form").find(".experiment-id").val();

			var siteName = $("ul[target=experiment_"+experimentId+"] li[value=" + siteId +"]").html();

			$(this).closest("form").find("input[name=siteId]").val(siteId);

			$('#confirm-copy-popup .experiment-name-placeholder').html(experimentName);
			$('#confirm-copy-popup .site-name-placeholder').html(siteName);
			$('#confirm-copy-popup .confirm-copy').attr("value", experimentId);
		});

		$(".delete").click(function(e)
		{
			$('#confirm-delete-popup').css("height", "370px");
			$('#confirm-delete-popup .dialog-header').css("background", "#FA774D");
			$('#confirm-delete-popup .dialog-header').css("color", "white");
			$('#confirm-delete-popup .popup-body').css("height", "220px");
			$('#confirm-delete-popup').show();

			var experimentName = $(this).closest("form").find(".experiment-name").val();
			var experimentId = $(this).closest("form").find(".experiment-id").val();
			var source = $(this).closest("form").find(".source").val();
			var securityToken = $("input[name=csftoken]").val();

			$('#confirm-delete-popup .experiment-name-placeholder').html(experimentName);
			$('#confirm-delete-popup .action-button.green').html('<a style="color: white;" href="/abTest/archiveExperiment?id=' + experimentId + '&csftoken=' + securityToken + '&displayOption=' + source + '">'+$(".confirmPopupValidate").attr("value")+'</a>');
			e.preventDefault();
		});

		$("#confirm-copy-popup .action-button.green").click(function()
		{
			var experimentId = $("#confirm-copy-popup .confirm-copy").attr("value");
			$("form#form-" + experimentId).submit();
		});
	},

	setupCarrousel: function()
	{
		$(".button-next").click(function()
		{
			var innerCarrouselSelector = ".carrousel-" + $(this).attr("value") + " > div";
			var outerCarrouselSelector = ".carrousel-" + $(this).attr("value");

			var frameWidth = parseInt($(outerCarrouselSelector).css("width"));
			var innerFrameWidth = parseInt($(innerCarrouselSelector).css("width"));
			var carrouselIndex = parseInt($(innerCarrouselSelector).css("margin-left"));

			if (innerFrameWidth + carrouselIndex - 192 > frameWidth)
			{
				carrouselIndex -= 192;
			}

			jQuery(innerCarrouselSelector).css("margin-left", carrouselIndex + "px");
		});

	    $(".button-previous").click(function()
		{

			var innerCarrouselSelector = ".carrousel-" + $(this).attr("value") + " > div";

			var carrouselIndex = parseInt($(innerCarrouselSelector).css("margin-left"));

			if (carrouselIndex < 0)
			{
				carrouselIndex += 192;
			}

			$(innerCarrouselSelector).css("margin-left", carrouselIndex + "px");
		});
	},

	setupSignificancePopup: function()
	{
		$('.bo-progress').hide();
		$('.bo-progress').css("top", "50px");
		$('.bo-progress').css("left", "-100px");

		$('.bo-progress').click(function(){$(this).hide();});

		$(".display-popup").hover(function()
		{
			if (! $(this).hasClass("display-popup"))
			{
				return;
			}
			var identifier = $(this).attr("value");
			var popup = $("." + identifier);


			var body = $("body");
			if (popup.parent().get(0) != body.get(0))
			{
				popup.detach();
				body.append(popup);
				popup.css("position", "absolute");
				popup.css("width", "196px");
				popup.css("height", "auto");
			}

			popup.css("top", ($(this).offset().top + 75) + "px");
			popup.css("left", $(this).offset().left + "px");

			popup.fadeIn(300);
			popup.clearQueue();
		},
		function()
		{
			var identifier = $(this).attr("value");
			var popup = $("." + identifier);
			popup.clearQueue();
			popup.fadeOut(300);
		});
	},

	setupPopupsButtonsShow: function()
	{
        var $targetingPopupDetails = $('#targeting-popup-details');

		$("#targeting-popup-details .action-button.green").hide();
		$("#targeting-popup-details .action-button.cancel").hide();
		$("#targeting-popup-details .action-button.close").show();
		$("#heatMaps-popup .action-button.green").hide();
		$("#heatMaps-popup .action-button.cancel").hide();
		$("#heatMaps-popup .action-button.close").show();
		$("#stop-experiment-confirmation-popup .action-button.green").show();
		$("#stop-experiment-confirmation-popup .action-button.cancel").show();
		$("#stop-experiment-confirmation-popup .action-button.close").hide();

        $targetingPopupDetails.css('top', ($(window).height() - $targetingPopupDetails.height()) / 2);
        $(window).on('resize', function() {
            $targetingPopupDetails.css('top', ($(window).height() - $targetingPopupDetails.height()) / 2);
        });
	},

	setupDisplayTableDataPage: function(goalId)
	{
		//set table cell width when there is only two columns
		var columnCount = parseInt($("#columnCount").attr("value"));
		if(columnCount == 2)
		{
			$("table.goal-results .data-cell").css("width", "215px");
		}


		var percentileNumbers = $("[goal=" + goalId + "] .data-row:not(.bayesianReliabilityLevel-row):not(.visits-row):not(.allConversions-row):not(.convertedVisits-row):not(.revenue-row) .left-side");
		percentileNumbers.each(function(index, element)
		{
			if (element.innerHTML.match(","))
			{
				var splitNumber = element.innerHTML.split(",");
				$(this).html(splitNumber[0]);
				$(this).next().html("," + splitNumber[1]);
			}
			if (element.innerHTML.match("/"))
			{
				var splitNumber = element.innerHTML.split("/");
				$(this).html(splitNumber[0] + " ");
				$(this).next().html("/ " + splitNumber[1]);
			}
		});

		$("[goal=" + goalId + "] .forward-table-col").click(function()
		{
			var headers = $(this).parent().find("table.goal-results").find("tr td.variation-table-header");
			var dataRows = $(this).parent().find("table.goal-results").find("tr.data-row");

			var startingHiddenIndex = -1;
			var startingIndex = -1;

			headers.each(function(index)
			{
				if ($(this).css("display") == "none" && startingHiddenIndex == -1)
				{
					startingHiddenIndex = index;
				}
				if ($(this).css("display") != "none" && startingIndex == -1)
				{
					startingIndex = index;
				}
			});

			//change color of scrollColumn
			var indexToRenderNext = startingIndex + 1 + 3;
			var indexToRenderPrevious = startingIndex;

			if (startingIndex >= headers.length - 5)
			{
				$(this).css("opacity", "0.2");
			}
			else
			{
				$(this).css("opacity", "1");
			}

			$(this).parent().parent().find(".backward-table-col").css("opacity", "1");


			headers.each(function(index)
			{
				if (index < headers.length)
				{
					if (index == startingIndex && index !=  headers.length - 4)
					{
						$(this).css("display", "none");
					}
					if (index == (startingIndex + 4))
					{
						$(this).css("display", "table-cell");
					}
				}
			});

			dataRows.each(function(rowIndex)
			{
				var dataCells = $(this).find("td.data-cell");

				dataCells.each(function(index)
				{
					if (index == startingIndex && index !=  headers.length - 4)
					{
						$(this).css("display", "none");
					}
					if (index == (startingIndex + 4))
					{
						$(this).css("display", "table-cell");
					}
				});
			});

		});


		$("[goal=" + goalId + "] .see-full-targeting-list[target-popup], .green[variationName]").click(function()
		{
			SiteController.fixSelectBoxHeights();
			$("#backoffice-overlay").fadeIn();
			$($(this).attr("target-popup")).fadeIn();
			$($(this).attr("target-popup")).css("height", "500px");
			$($(this).attr("target-popup")).find(".dialog-body").css("height", "332px");
			$($(this).attr("target-popup")).find(".dialog-body").css("overflow-y", "auto");

			$($(this).attr("target-popup")).find("#variationName").html($(this).attr("variationName"));
			$($(this).attr("target-popup")).find("#goal").val($(this).attr("goalId"));
			$($(this).attr("target-popup")).find("#variationId").val($(this).attr("variationId"));

			$($(this).attr("target-popup")).find(".action-button.green").click(function()
			{
				$(this).closest(".dialog-content").find("form").submit();
			});
		});

		$("[goal=" + goalId + "] .backward-table-col").click(function()
		{
			var headers = $(this).parent().parent().find("table.goal-results").find("tr td.variation-table-header");
			var dataRows = $(this).parent().parent().find("table.goal-results").find("tr.data-row");

			var lastHiddenIndex = -1;
			var lastVisibleIndex = -1;

			headers.each(function(index)
			{
				if ($(this).css("display") == "none" && lastHiddenIndex >= lastVisibleIndex)
				{
					lastHiddenIndex = index;
				}
				if ($(this).css("display") != "none")
				{
					lastVisibleIndex = index;
				}
			});

			var indexToRenderPrevious = lastVisibleIndex -1 -3;
			var indexToRenderNext = lastVisibleIndex;


			if (lastVisibleIndex <= 4)
			{
				$(".backward-table-col").css("opacity", "0.2");
			}
			else
			{
				$(".backward-table-col").css("opacity", "1");
			}

			$(".forward-table-col").css("opacity", "1");


			headers.each(function(index)
			{
				if (index < headers.length && lastVisibleIndex > 3)
				{
					if (index == lastVisibleIndex)
					{
						$(this).css("display", "none");
					}
					if (index == lastVisibleIndex - 4)
					{
						$(this).css("display", "table-cell");
					}
				}
			});

			dataRows.each(function(rowIndex)
			{
				var dataCells = $(this).find("td.data-cell");

				dataCells.each(function(index)
				{
					if (index < headers.length && lastVisibleIndex > 3)
					{
						if (index == lastVisibleIndex)
						{
							$(this).css("display", "none");
						}
						if (index == lastVisibleIndex - 4)
						{
							$(this).css("display", "table-cell");
						}
					}
				});
			});
		});
	},

	toggleDetailedView: function(jElement)
	{
		// jElement.parent().find(".improvement-row").toggleClass("folded");
		jElement.parent().find(".data-row.detail-row").toggle();

		// jElement.parent().find(".toggle-detailed-view-show").toggle();
		// jElement.parent().find(".toggle-detailed-view-hide").toggle();
	},

	/** GRAPHS */

	populateColorsForVariations: function(improvementList, improvementListExcludeReferenceAndWinning, winningVariationId)
	{
		SiteController.improvementList = improvementList;
		SiteController.winningVariationId = winningVariationId;
		if (SiteController.improvementList)
		{
			var improvementList = SiteController.improvementList;
			SiteController.improvementListIndex = ["reference"];
			SiteController.variationNameList = {};
			SiteController.colorMapString = {"reference": "gray"};

			// var improvementListExcludeReferenceAndWinning = SiteController.improvementListExcludeReferenceAndWinning;
			var improvementListWithoutReference = [];
			//construct improvementListIndex, used in _test.gsp
			if(winningVariationId)
			{
				if(winningVariationId != "reference")
				{
					SiteController.improvementListIndex.push(Number(winningVariationId));
					improvementListWithoutReference.push(Number(winningVariationId));
				}
			}

			for(var i=0; i< improvementListExcludeReferenceAndWinning.length; i++)
			{
				SiteController.improvementListIndex.push(improvementListExcludeReferenceAndWinning[i].id);
				improvementListWithoutReference.push(improvementListExcludeReferenceAndWinning[i].id);
			}
			//construct variationNameList, used in _graph.gsp
			for (var i=0; i < improvementList.length; ++i)
			{
				SiteController.variationNameList[improvementList[i].id] = improvementList[i].name;
			}

			//construct colorMapString
			for(var i=0; i<improvementListWithoutReference.length; i++)
			{
				SiteController.colorMapString[improvementListWithoutReference[i]] = SiteController.colorsListWithoutGray[i%(SiteController.colorsListWithoutGray.length)];
			}

		}
	},

	populateColorsForVariationsNoEnoughData: function(improvementList, improvementListExcludeReference)
	{
		SiteController.improvementList = improvementList;
		SiteController.improvementListExcludeReference = improvementListExcludeReference;
		if (SiteController.improvementList)
		{
			var improvementList = SiteController.improvementList;
			var improvementListExcludeReference = SiteController.improvementListExcludeReference;
			SiteController.improvementListIndex = ["reference"];
			SiteController.variationNameList = {};
			SiteController.colorMapString = {"reference": "gray"};

			for(var i=0; i< improvementListExcludeReference.length; i++)
			{
				SiteController.improvementListIndex.push(improvementListExcludeReference[i].id);
			}

			//construct colorMapString
			for(var i=1; i<improvementList.length; i++)
			{
				SiteController.colorMapString[improvementList[i].id] = SiteController.colorsListWithoutGray[(i-1)%(SiteController.colorsListWithoutGray.length)];
			}
		}
	},

	populateColorsForVariationsNoKameleoonTracking: function(improvementList)
	{
		SiteController.improvementList = improvementList;
		SiteController.colorMapString = {"reference": "gray"};
		if(SiteController.improvementList)
		{
			//construct colorMapString
			for(var i=1; i<improvementList.length; i++)
			{
				SiteController.colorMapString[improvementList[i].id] = SiteController.colorsListWithoutGray[(i-1)%(SiteController.colorsListWithoutGray.length)];
			}
		}

	},

	obtainColorNameFromVariationId: function(variationId)
	{
		if (SiteController.colorMapString &&
			SiteController.colorMapString[variationId]) {
			return SiteController.colorMapString[variationId];
		}

		return null;
	},

	obtainColorRGBFromVariationId: function(variationId)
	{

		return SiteController.graphColorsMap[SiteController.obtainColorNameFromVariationId(variationId)];
	},

	obtainColorRGBFromVariationIdNoTracker: function(variationId)
	{
		return SiteController.graphColorsMap[SiteController.obtainColorNameFromVariationId(variationId)];
	},

	computeMaxData: function(chartData)
	{
		var maxData = 0;
		for (var i = 0; i < chartData.datasets.length; i++)
		{
			var data = chartData.datasets[i].data;
			for (var j = 0; j < data.length; j++)
			{
				maxData = Math.max(maxData, data[j]);
			}
		}
		return maxData;
	},

	addLegend: function(parent, data)
	{
		var datas = data.hasOwnProperty('datasets') ? data.datasets : data;

		datas.forEach(function(d)
		{
			var title = document.createElement('span');
			title.className = 'title';
			title.setAttribute('title', d.fullName);
			title.style.borderColor = d.hasOwnProperty('strokeColor') ? d.strokeColor : d.color;
			title.style.borderStyle = 'solid';
			parent.appendChild(title);

			var text = document.createTextNode(d.shortName);
			title.appendChild(text);
		});
	},

	adjustPopupHeight: function(size)
	{
		if (size > 5)
		{
			$(" #targeting-popup-details  .dialog-body").css({
				"height": "500px",
				"overflow-y" : "scroll"
			});
		}
	},

	updateExperimentDashboardDataList: function(experimentId, data)
	{
		if(data.noData)
		{
			sessionStorage.setItem(experimentId,  JSON.stringify({
				"noData": true,
				"totalTraffic": 0,
				"winningVariation": null,
				"winningVariationId": null,
				"improvementRate": null,
				"chartData": null
			}));
		}
		else if(data.requestError)
		{
			sessionStorage.setItem(experimentId,  JSON.stringify({
				"requestError": true,
				"totalTraffic": 0,
				"winningVariation": null,
				"winningVariationId": null,
				"improvementRate": null,
				"chartData": null
			}));
		}
		else
		{
			if(data.noEnoughData)
			{
				sessionStorage.setItem(experimentId,  JSON.stringify({
					"noEnoughData": true,
					"totalTraffic": data.totalTraffic,
					"winningVariation": null,
					"winningVariationId": null,
					"improvementRate": null,
					"chartData": null
				}));
			}
			else
			{
				sessionStorage.setItem(experimentId,  JSON.stringify({
					"noEnoughData": false,
					"totalTraffic": data.totalTraffic,
					"winningVariation": data.winningVariation,
					"winningVariationId": data.winningVariationId,
					"improvementRate": data.improvementRate,
					"chartData": data.chartData? data.chartData[0] : null
				}));
			}
		}

	},

	storeOldExperimentsData: function(experimentId, data)
	{
		if(typeof sessionStorage != "undefined")
		{
			data.experimentId = experimentId;
			sessionStorage.setItem("oldExperimentData", JSON.stringify(data));
		}

	},

	setupHeatMapsActions: function()
	{
		$("table.heatMapTable tr.table-row-heatmap").hover(function(){
			$(this).css("background-color", "rgba(0, 0, 0, 0.1)");
		}, function(){
			$(this).css("background-color", "white");
		});

		$("table.heatMapTable tr.table-row-heatmap").click(function()
		{
			window.open($(this).attr("href"),'_blank');
		});

		$(".editBaseURL.edit").click(function(){
			$("div#displayBaseURL").toggle();
			$("div#modifyBaseURL").toggle();
		});



		$(".changeBaseURL.cancel").click(function(){
			$("div#modifyBaseURL").toggle();
			$("div#displayBaseURL").toggle();
		});

	},

	registerFVEventListener: function(goalId)
	{
		//register eventListener for ventialtion's close button
		$("#primary_KAMELEOON_" + goalId +" .fVListsContainer .ventilation-item > .VentilationCloseButton").click(function()
		{
			SiteController.filterVentilationList["primary_KAMELEOON_" + goalId].removeVentilation();
		});
		//register eventListener for filters' close button
		var filterList = $("#primary_KAMELEOON_" + goalId +" .fVListsContainer .filter-item");
		if(filterList.length > 0)
		{
			$.each(filterList, function(index, filter)
			{
				var filterId = filter.getAttribute('id');
				var filterType = filterId.substring(6, filterId.indexOf("Item"));
				$("#primary_KAMELEOON_" + goalId + " .fVListsContainer #Filter" + filterType + "Item").text(TEST_CONSTANTS.filtersDisplayName[filterType]).append("<button type='button' class='FVWidget FilterCloseButton close-button'></button>");
				$("#primary_KAMELEOON_" + goalId + " .fVListsContainer #Filter" + filterType + "Item" + " > .FilterCloseButton").click(SiteController.filterVentilationList["primary_KAMELEOON_" + goalId].removeFilter.bind(SiteController.filterVentilationList["primary_KAMELEOON_" + goalId], filterType));
			});

		}
		//register eventListener for resetFV button
		$("#primary_KAMELEOON_" + goalId + " .FVWidget#initialResetFV").click( SiteController.filterVentilationList["primary_KAMELEOON_" + goalId].resetFV );
	},

	showAlertVariationDeletion: function(variationName)
	{
		$('#confirm-delete-variation-popup').css("height", "370px");
		$('#confirm-delete-variation-popup #variation-name-placeholder').html(variationName);
		$('#confirm-delete-variation-popup .dialog-header').css("background", "#FA774D");
		$('#confirm-delete-variation-popup .dialog-header').css("color", "white");
		$('#confirm-delete-variation-popup .popup-body').css("height", "220px");
		$('#confirm-delete-variation-popup').show();
	},

	obtainWeek: function(day)
	{
		if(day <=7 && day >=0)
		{
			return 1;
		}
		else if(day <= 14 && day >7)
		{
			return 2;
		}
		else if(day <=21 && day >14)
		{
			return 3;
		}
		else
		{
			return 4;
		}

	},

	obtainMonthName: function(month)
	{
		var monthName = null;
		monthName = $("input#dayOfWeek"+month).attr('value');
		return monthName;
	},

	getViewPortHeight: function()
	{
		var viewportHeight;

		// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight

		if (typeof window.innerHeight != 'undefined')
		{
		    viewportHeight = window.innerHeight
		}

		// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)

		else if (typeof document.documentElement != 'undefined'
		     && typeof document.documentElement.clientHeight !=
		     'undefined' && document.documentElement.clientHeight != 0)
		{
		    viewportHeight = document.documentElement.clientHeight
		}

		// older versions of IE

		else
		{
		    viewportHeight = document.getElementsByTagName('body')[0].clientHeight
		}

		return viewportHeight;
	},

	processImprovementRateForRadarChart: function(dataArray)
	{
		var integerArray = [];
		for(var index=0; index<dataArray.length; index++)
		{
			integerArray.push(
				Math.abs(dataArray[index] < 1)
				? dataArray[index]
				: Math.round(dataArray[index])
			);
		}

		return integerArray;
	},

	setupChangeNum: function()
	{
		 $('.number .change_numb div').click(function(){
            var level=$(this).data('level');
            var value=$(this).parent().parent().find('div.filter_visit_input').find('input').val();
            if(level=='plus'){
                if(value<=99){
                    $(this).parent().parent().parent().find('input').val(parseInt(value)+1)
                }
                if(value>99){
                    $(this).parent().parent().parent().find('input').val(100)
                }
            }
            if(level=='minus'){
                if(value>=1){
                    $(this).parent().parent().parent().find('input').val(parseInt(value)-1)
                }
                if(value<1){
                    $(this).parent().parent().parent().find('input').val(0)
                }
            }
        });
	},

	obtainDatePickerLocalDate: function(date, offset)
	{

		var UTCTimeStamp = date.getTime() - date.getTimezoneOffset()*1000*60;
		var localDate = UTCTimeStamp - offset;

		return localDate;
	},

	checkErrorStatus : function(jqXHR) {
        if(jqXHR.readyState == 4 && (jqXHR.status == 205 || jqXHR.status == 401)) {
            window.open(window.location, "_self");
        }
	},

	setupAjaxError : function()
	{
        $.ajaxSetup({error : function(jqXHR) {
            SiteController.checkErrorStatus(jqXHR);
        }});
	}
};

SiteController.setupAjaxError();
