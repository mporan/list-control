function mporan_list_control(itemId, a) {
		var regionID = $("#" + itemId).closest(".t-Region").attr("id"),
			$region = $("#" + regionID),
			apexItemIDList = apex.item(itemId),
			controlType = a.attr1,
			position = a.attr2,
			seperatorTrue = Boolean(a.attr3 == 'Y'), 
			seperatorClass = "",
			itemSelectedCls = "lcp__item--selected",
			containerCls, itemCls, itemWrapCls,
			typeMultiSelectArr = ["checkbox", "circle-checked-multi", "plus-circle-checked", "toggle-switch", "hidden-multi","star","heart"],
			typeMultiSelectTrue = typeMultiSelectArr.indexOf(controlType) > -1,
			typeFaIconArr = ["circle-checked-single", "circle-checked-multi", "plus-circle-checked", "toggle-switch","star","heart"],
			typeFaIconTrue = typeFaIconArr.indexOf(controlType) > -1,
			typeFaIconLargeArr = ["plus-circle-checked", "toggle-switch","star","heart"],
			typeFaIconLargeTrue = typeFaIconLargeArr.indexOf(controlType) > -1,
			typeHidden = ["hidden-single", "hidden-multi"],
			typeHiddenTrue = typeHidden.indexOf(controlType) > -1,
			toggleOffIconClass,
			toggleOnIconClass;

		if (controlType == "plus-circle-checked") {
			toggleOffIconClass = 'fa-plus-circle-o';
			toggleOnIconClass = 'fa-check-circle';
		} else if (controlType == "circle-checked-single" || controlType == "circle-checked-multi") {
			toggleOffIconClass = 'fa-circle-thin';
			toggleOnIconClass = 'fa-check-circle';
		} else if (controlType == "toggle-switch") {
			toggleOffIconClass = 'fa-toggle-off';
			toggleOnIconClass = 'fa-toggle-on';
		} else if (controlType == "star") {
			toggleOffIconClass = 'fa-star-o';
			toggleOnIconClass = 'fa-star';
		} else if (controlType == "heart") {
			toggleOffIconClass = 'fa-heart-o';
			toggleOnIconClass = 'fa-heart';
		}

		if ($region.find("ul").hasClass("t-Cards")) {
			containerCls = ".t-Cards";
			itemCls = ".t-Cards-item";
			itemWrapCls = ".t-Card-wrap";
		} else if ($region.find("ul").hasClass("t-MediaList")) {
			containerCls = ".t-MediaList";
			itemCls = ".t-MediaList-item";
			itemWrapCls = ".t-MediaList-itemWrap";
			if (seperatorTrue) {
				seperatorClass = " lcp__ctrl--sep-y "
			} else {
				seperatorClass = " lcp__ctrl--sep-n "
			}

		} else {			
			apex.debug.error("ERROR for List Control plug-in page item " + itemId + ": Parent region must have a list or card template. See plug-in docs for instructions."); 
		}

		function loadControls() {
			//  add class to reports
			$region.find(containerCls + "[id$='_report']").addClass("lcp__container--report");
			$region.find(containerCls).addClass("lcp__container");
			$region.find(itemCls).addClass("lcp__item");
			$region.find(itemWrapCls).addClass("lcp__ut-wrap");
			if (!typeHiddenTrue) {
				$region.find(itemWrapCls).addClass("lcp__ut-wrap--visible lcp__ut-wrap--" + position);
			}

			var largeIcon = "";
			if (typeFaIconLargeTrue) {
				largeIcon = " lcp__icon--lg ";
			}

			var selectionHtml = "<div class=\"lcp__ctrl lcp__ctrl--" + position + seperatorClass + "\">";
			if (controlType == 'checkbox' || controlType == 'radio') {
				selectionHtml += "<span class=\"lcp__input lcp__input--" + controlType + "\"></span>";
			} else if (typeFaIconTrue) {
				selectionHtml += "<span class=\"lcp__icon fa " + toggleOffIconClass + largeIcon + " lcp__icon--off\"></span>"; //fa-lg
			}
			selectionHtml += "</div>";

			if (!typeHiddenTrue) {
				if (position == "start") {
					$region.find(itemWrapCls).prepend(selectionHtml);
				}
				if (position == "end") {
					$region.find(itemWrapCls).append(selectionHtml);
				}
			}

			var ids = apexItemIDList.getValue().length === 0 ? [] : apexItemIDList.getValue().split(':');

			// UT report cards template doesn't have LINK_ATTRIBUTES. Adding data-id manually
			$region.find(".t-Cards-item").each(function () {
				var className = this.className.match(/lcp-data-id-\d+/);
				if (className) {
					var dataIdClassPrefix = "lcp-data-id-";
					var dataId = className[0].slice(className[0].indexOf(dataIdClassPrefix) + dataIdClassPrefix.length);
					$(this).find(itemWrapCls).attr('data-id', dataId);
				}
			});

			ids.forEach(function (value) {
				$region.find('[data-id="' + value + '"]').closest(itemCls).addClass(itemSelectedCls);

			});
			$region.find("." + itemSelectedCls + " ." + toggleOffIconClass).removeClass(toggleOffIconClass + " lcp__icon--off").addClass(toggleOnIconClass + " lcp__icon--on");
		}

		// Load on page load 
		loadControls(); 

		// reload on region refresh 
		$region.on("apexafterrefresh", function () {
			LoadControls();
		});

		// Handle click  
		$("body").on("click", "#" + regionID + " " + itemWrapCls, function (e) {

			e.preventDefault();
			var selectedID = $(this).data("id");
			apex.debug("Clicked ID " + selectedID);

			if (typeMultiSelectTrue) {

				//DOM object for APEX Item that holds list.
				var ids = apexItemIDList.getValue().length === 0 ? [] : apexItemIDList.getValue().split(':');
				ids = ids.map(String);

				selectedID = selectedID.toString();
				//Index of current ID. If it's not in array, value will be -1
				var idIndex = ids.indexOf(selectedID);
				var isSelected = $(this).closest(itemCls).hasClass(itemSelectedCls);
				if (!isSelected) {
					$(this).closest(itemCls).addClass(itemSelectedCls);
					ids.push(selectedID);
				} else {
					$(this).closest(itemCls).removeClass(itemSelectedCls);
					ids.splice(idIndex, 1);
				}

				if (typeFaIconTrue) {
					if (!isSelected) {

						$(this).find("." + toggleOffIconClass).removeClass(toggleOffIconClass + " lcp__icon--off").addClass(toggleOnIconClass + " lcp__icon--on");
					} else {
						$(this).find("." + toggleOnIconClass).removeClass(toggleOnIconClass + " lcp__icon--on").addClass(toggleOffIconClass + " lcp__icon--off");
					}
				}

				ids.sort(function (a, b) { return b - a; });
				
				//Convert array back to comma delimited list
				apexItemIDList.setValue(ids.join(':'));
			} else {
				$(this).closest(containerCls).find(itemCls).removeClass(itemSelectedCls);
				$(this).closest(itemCls).addClass(itemSelectedCls);
				$(this).closest(containerCls).find(".lcp__icon").removeClass(toggleOnIconClass + " lcp__icon--on").addClass(toggleOffIconClass + " lcp__icon--off");
				$(this).find("." + toggleOffIconClass).removeClass(toggleOffIconClass + " lcp__icon--off").addClass(toggleOnIconClass + " lcp__icon--on");
				apexItemIDList.setValue(selectedID);
			}
		});
	}