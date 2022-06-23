/*
*
* Kn Select
* ver. 1.4.4 (last update: 28.06.2017)
*
* by Oleg Ivanov (Tangent)
*
*/

!function(global) {

    function setSettings(options) {
        var settings = {
            select: '',
            searchLimitItems: '6',
            searchIconDelete: true,
            theme: 'default'
        };

        settings.select = options.select;

        if(options.searchLimitItems) {
            settings.searchLimitItems = options.searchLimitItems;
        }

        if(options.searchIconDelete) {
            settings.searchIconDelete = options.searchIconDelete;
        }

        if(options.theme) {
            settings.theme = options.theme;
        }

        createKnSelect(settings);
    }

    function createKnSelect(options) {

        var srcSelect = document.querySelectorAll('select' + options.select);
        var selectWrapper;
        var select;
        var selectSearch;
        var selectSearchContainer;
        var selectSearchIconSearch;
        var selectSearchIconDelete;
        var selectSearchInput;
        var selectDropdownContainer;
        var selectDropdown;
        var selectDropdownItem;

        for(var i = 0, l = srcSelect.length; i < l; i += 1) {
            srcSelectLength = srcSelect[i].length;
            createSelectWrapper(srcSelect[i]);
            createSelect(srcSelect[i]);
            createSelectDropdownContainer();
            createSelectDropdown(srcSelectLength);
            fillSelect(srcSelect[i], select);
            chooseDropdownItem();

            if(srcSelectLength >= options.searchLimitItems) {
                createSelectSearch();
                createSelectSearchInput(srcSelect[i]);
                createSelectSearchIconSearch(options);

                if(options.searchIconDelete) {
                    createSelectSearchIconDelete(options)
                }

                searchController();
            }

            dropdownController(srcSelectLength);

            srcSelect[i].parentNode.insertBefore(selectWrapper, srcSelect[i]);
            srcSelect[i].remove();
        }

        function createSelectWrapper(srcSelect) {
            selectWrapper = document.createElement('div');
            selectWrapper.classList.add('kn-select-wrapper', 'kn-select-wrapper_theme_' + options.theme);
        }

        function createSelect(srcSelect) {
            var id = srcSelect.getAttribute('id');
            var name = srcSelect.getAttribute('name');
            var placeholder = srcSelect.getAttribute('placeholder');
            var classList = srcSelect.classList;

            select = document.createElement('input');

            if(id) {
                select.setAttribute('id', id);
            }

            if(name) {
                select.setAttribute('name', name);
            }

            if(placeholder) {
                select.setAttribute('placeholder', placeholder);
            }

            for(var i = 0, l = classList.length; i < l; i += 1) {
                select.classList.add(classList[i]);
            }

            select.classList.add('kn-select', 'kn-select_theme_' + options.theme);
            select.setAttribute('type', 'text');
            select.setAttribute('theme', options.theme);
            select.setAttribute('autocomplete', 'off');
            select.setAttribute('readonly', 'readonly');
            select.setAttribute('onfocus', 'this.blur()');
            select.setAttribute('autotest', options.select.replace('.js-', '').replace('#', ''));

            selectWrapper.appendChild(select);
        }

        function createSelectDropdownContainer() {
            selectDropdownContainer = document.createElement('div');
            selectDropdownContainer.classList.add('kn-select-dropdown-container', 'kn-select-dropdown-container_theme_' + options.theme, 'kn-select-hidden');

            selectWrapper.appendChild(selectDropdownContainer);
        }

        function createSelectSearch() {
            selectSearch = document.createElement('div');
            selectSearch.classList.add('kn-select-search', 'kn-select-search_theme_' + options.theme);

            createSelectSearchContainer();
            selectDropdown.parentNode.insertBefore(selectSearch, selectDropdown);
        }

        function createSelectSearchContainer() {
            selectSearchContainer = document.createElement('div');
            selectSearchContainer.classList.add('kn-select-search__container', 'kn-select-search__container_theme_' + options.theme);

            selectSearch.appendChild(selectSearchContainer);
        }

        function createSelectSearchIconSearch(options) {
            selectSearchIconSearch = document.createElement('div');
            selectSearchIconSearch.classList.add('kn-select-search__icon-search', 'kn-select-search__icon-search_theme_' + options.theme);

            selectSearchContainer.appendChild(selectSearchIconSearch);
        }

        function createSelectSearchIconDelete(options) {
            selectSearchIconDelete = document.createElement('div');
            selectSearchIconDelete.classList.add('kn-select-search__icon-delete', 'kn-select-search__icon-delete_theme_' + options.theme, 'kn-select-hidden');

            selectSearchContainer.appendChild(selectSearchIconDelete);
        }

        function createSelectSearchInput(srcSelect) {
            var searchPlaceholder = srcSelect.getAttribute('data-search-placeholder');

            selectSearchInput = document.createElement('input');
            selectSearchInput.classList.add('kn-select-search__input', 'kn-select-search__input_theme_' + options.theme);

            if(!!searchPlaceholder) {
                selectSearchInput.setAttribute('placeholder', searchPlaceholder);
            }

            selectSearchContainer.appendChild(selectSearchInput);
        }

        function createSelectDropdown(srcSelectLength) {
            selectDropdown = document.createElement('div');
            selectDropdown.classList.add('kn-select-dropdown', 'kn-select-dropdown_theme_' + options.theme);

            selectDropdownContainer.appendChild(selectDropdown);
        }

        function fillSelect(dropdownItems, newSelect) {
            var currentDropdownItem;

            if(!newSelect.hasAttribute('placeholder')) {
                insertOption(newSelect, dropdownItems[0]);
            }

            for(var i = 0, l = dropdownItems.length; i < l; i += 1) {
                currentDropdownItem = dropdownItems[i];

                if(!(currentDropdownItem.value && currentDropdownItem.text)) {
                    continue;
                }
                else if(currentDropdownItem.hasAttribute('selected')) {
                    insertOption(newSelect, currentDropdownItem);
                }

                createSelectDropdownItem(currentDropdownItem);
            }
        }

        function createSelectDropdownItem(dropdownItem) {
            var itemText = document.createTextNode(dropdownItem.text);
            var attributes = dropdownItem.attributes;

            selectDropdownItem = document.createElement('div');

            for(var i = 0, l = attributes.length; i < l; i += 1) {
                if(attributes[i].name === 'id' ||
                   attributes[i].name === 'name' ||
                   attributes[i].name === 'data-value' ||
                   attributes[i].name === 'selected') {
                    continue;
                }

                selectDropdownItem.setAttribute(attributes[i].name, attributes[i].value);
            }

            selectDropdownItem.classList.add('kn-select-dropdown__item', 'kn-select-dropdown__item_theme_' + options.theme);
            selectDropdownItem.setAttribute('autotest', dropdownItem.text);

            selectDropdownItem.appendChild(itemText);
            selectDropdown.appendChild(selectDropdownItem);
        }

        function chooseDropdownItem() {
            var dropdownItems = selectDropdown.childNodes;

            for(var i = 0, l = dropdownItems.length; i < l; i += 1) {
                addEventItem(dropdownItems[i]);
            }

            function addEventItem(item) {
                item.addEventListener('click', setSelectParams, false);
            }

            function setSelectParams() {
                var currentSelect = this.parentNode.parentNode.parentNode.querySelector(options.select);
                var text = this.innerText;
                var attributes = this.attributes,
                    dataValue;

                currentSelect.value = text;

                for(var i = 0, l = attributes.length; i < l; i += 1) {
                    if(attributes[i].name === 'class' ||
                       attributes[i].name === 'autotest') {
                        continue;
                    }

                    if(attributes[i].name === 'value') {
                        currentSelect.setAttribute('data-value', attributes[i].value);
                        dataValue = attributes[i].value;
                        continue;
                    }

                    currentSelect.setAttribute(attributes[i].name, attributes[i].value);
                }

                if (!!$) {
                    $(currentSelect).trigger('change',[dataValue]);
                }
            }
        }

        function searchController() {
            var dropdownItems = selectDropdown.childNodes;
            var _this;
            var _iconDelete;
            var _searchInputValue;

            selectSearchInput.addEventListener('keyup', searchDropdownItem, false);
            selectSearchIconDelete.addEventListener('click', clearSearchInput, false);

            function searchDropdownItem() {
                var searchInputValue = this.value;
                var iconDelete = this.parentNode.querySelector('.kn-select-search__icon-delete');
                var currentValue;

                _this = this;
                _iconDelete = iconDelete;
                _searchInputValue = searchInputValue;

                if(searchInputValue != '') {
                    iconDelete.classList.remove('kn-select-hidden');
                }
                else {
                    iconDelete.classList.add('kn-select-hidden');
                }

                for(var i = 0, l = dropdownItems.length; i < l; i += 1) {
                    currentValue = dropdownItems[i];

                    if(currentValue.innerHTML.toLowerCase().indexOf(searchInputValue.toLowerCase()) === -1) {
                        currentValue.classList.add('kn-select-hidden');
                    }
                    else {
                        currentValue.classList.remove('kn-select-hidden');
                    }
                }
            }

            function clearSearchInput() {
                _this.value = '';
                _iconDelete.classList.add('kn-select-hidden');

                for(var i = 0, l = dropdownItems.length; i < l; i += 1) {
                    dropdownItems[i].classList.remove('kn-select-hidden');
                }
            }
        }

        function dropdownController(srcSelectLength) {
            var _this;
            var _dropdown;
            var _search;

            select.addEventListener('click', toogleVisibility, false);
            document.getElementsByTagName('html')[0].addEventListener('click', setHidden, false);

            if(srcSelectLength >= options.searchLimitItems) {
                selectSearch.addEventListener('click', setVisible, false);
            }

            function toogleVisibility(event) {
                var openedSelect = document.querySelector('.kn-select-active');
                var openedSelectChilds;

                event.stopPropagation();

                _this = this;
                _dropdownContainer = _this.parentNode.querySelector('.kn-select-dropdown-container');

                _dropdownContainer.classList.remove('kn-select-hidden');
                _this.classList.add('kn-select_theme_' + options.theme + '-active');
                _this.classList.add('kn-select-active');

                if(openedSelect !== null) {
                    openedSelectChilds = openedSelect.parentNode.childNodes;

                    for(var i = 0, l = openedSelectChilds.length; i < l; i += 1) {
                        if(openedSelectChilds[i].classList.contains('kn-select-dropdown-container')) {
                            openedSelectChilds[i].classList.add('kn-select-hidden');
                            break;
                        }
                    }

                    openedSelect.classList.remove('kn-select_theme_' + options.theme + '-active')
                    openedSelect.classList.remove('kn-select-active')
                }
            }

            function setVisible(event) {
                event.stopPropagation();

                _dropdownContainer.classList.remove('kn-select-hidden');
                _this.classList.add('kn-select_theme_' + options.theme + '-active');
                _this.classList.add('kn-select-active');
            }

            function setHidden() {
                if(_this !== undefined) {
                    _dropdownContainer.classList.add('kn-select-hidden');
                    _this.classList.remove('kn-select_theme_' + options.theme + '-active');
                    _this.classList.remove('kn-select-active');
                }
            }
        }

        function insertOption(newSelect, dropdownItem) {
            var text = dropdownItem ? dropdownItem.innerText : '';
            var attributes = dropdownItem ? dropdownItem.attributes : '';
            newSelect.value = text;

            for(var i = 0, l = attributes.length; i < l; i += 1) {
                if(attributes[i].name === 'id' ||
                   attributes[i].name === 'name' ||
                   attributes[i].name === 'data-value' ||
                   attributes[i].name === 'selected' ||
                   attributes[i].name === 'class' ||
                   attributes[i].name === 'autotest') {
                    continue;
                }

                if(attributes[i].name === 'value') {
                    newSelect.setAttribute('data-value', attributes[i].value);
                    continue;
                }

                newSelect.setAttribute(attributes[i].name, attributes[i].value);
            }
        }
    }

    global.knSelect = {
        settings: setSettings,
    };

}(this);
