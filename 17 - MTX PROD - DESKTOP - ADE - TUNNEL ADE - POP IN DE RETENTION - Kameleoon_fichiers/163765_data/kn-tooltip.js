/*
*
* Kn Tooltip
* ver. 2.5.4 (last update: 16.11.2018)
*
* by Oleg Ivanov (Tangent)
*
*/

!function(global) {

    function setSettings(options) {
        var settings = {
            container: null,
            element: null,
            tooltip: null,
            offset: '15px',
            position: 'right',
            custom: null,
            resetPosition: false,
            rebuild: false,
            htmlContent: false,
            attrContent: false,
            timeout: false,
            cropped: false,
            croppedWidth: 120,
            theme: 'default'
        };

        if(options.container) {
            settings.container = options.container;
        }

        settings.element = options.element;
        settings.tooltip = options.tooltip;

        if(options.offset) {
            settings.offset = options.offset;
        }

        settings.offset = excludeDimension(settings.offset);

        if(options.position) {
            settings.position = options.position;

            if(options.position === 'custom') {
                settings.custom = options.custom;

                settings.custom.x = excludeDimension(settings.custom.x);
                settings.custom.y = excludeDimension(settings.custom.y);
            }
        }

        if(options.resetPosition) {
            settings.resetPosition = options.resetPosition;
        }

        if(options.rebuild) {
            settings.rebuild = options.rebuild;
        }

        if(options.htmlContent) {
            settings.htmlContent = options.htmlContent;
        }

        if(options.attrContent) {
            settings.attrContent = options.attrContent;
        }

        if(options.timeout) {
            settings.timeout = options.timeout;
        }

        if(options.theme) {
            settings.theme = options.theme;
        }
        if(options.cropped) {
            settings.cropped = options.cropped;
        }

        if (options.croppedWidth) {
            settings.croppedWidth = options.croppedWidth;
        }

        initialization(settings);

        function excludeDimension(dimension) {
            return Math.floor(dimension.toString().replace('px', ''));
        }
    }

    function initialization(options) {

        var elements;
        var tooltips;
        if(options.container !== null) {
            if(typeof options.container === 'string') {
                var container = document.querySelectorAll(options.container);
                for(var i = 0, l = container.length; i < l; i++) {
                    elements = container[i].querySelectorAll(options.element);
                    tooltips = container[i].querySelectorAll(options.tooltip);
                    if(options.cropped) {
                        if(isOverflown(elements[0])) {
                            elements[0].innerHTML = truncateTextInEnd(elements[0].innerHTML, {width: options.croppedWidth})
                            handleTooltip(elements, tooltips, options);
                        }
                    } else {
                        handleTooltip(elements, tooltips, options);
                    }
                }
            }
            else {
                elements = options.container.querySelectorAll(options.element);
                tooltips = options.container.querySelectorAll(options.tooltip);
                handleTooltip(elements, tooltips, options);
            }
        }
        else {
            elements = document.querySelectorAll(options.element);
            tooltips = document.querySelectorAll(options.tooltip);
            handleTooltip(elements, tooltips, options);
        }

        function handleTooltip(elements, tooltips, options) {
            var numberOfElements = elements.length;
            var numberOfTooltips = tooltips.length;

            if(numberOfElements > 0 && numberOfTooltips > 0 && numberOfElements === numberOfTooltips) {
                for(var i = 0; i < numberOfElements; i++) {
                    prepareTooltip(elements[i], tooltips[i], options);
                }
            }
        }
    }
    function isOverflown(element) {
        return element.scrollWidth > element.clientWidth;
    }
    const DEFAULT_FONT = '12px Open Sans';

    const truncateTextInEnd = (text, opts = {}) => {

        const options = {
            font: opts.font || DEFAULT_FONT,
            width: opts.width
        };
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = options.width;
        context.font = options.font;


        let line = '';
        const result = [];


        const testLine = text;
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > options.width) {
            if (text) {
                setBreakByLetter(text);
            }
        }

        result.push(line);
        return result[0].slice(0, -3) + '...';

        function setBreakByLetter (word) {
            for (const letter in word) {
                const testWidth = context.measureText(line).width;

                if (testWidth < options.width) {
                    line += word[letter];
                } else {
                    result.push(line);
                    break;
                }

            }
        }

    };

    function prepareTooltip(currentElement, currentTooltip, options) {
        var builtTooltip;
        var timeout;

        addEventToElement(currentElement);

        function addEventToElement(element) {
            if(options.timeout) {
                element.addEventListener('mouseover', showTooltipWithTimeout.bind(null, element), false);
            }
            else {
                element.addEventListener('mouseover', showTooltip.bind(null, element), false);
            }

            element.addEventListener('mouseout', hideTooltip, false);
        }

        function showTooltip(element, event) {
            checkIfBuiltTooltipNotExist(element, event);
            builtTooltip.style.display = 'block';
        }

        function showTooltipWithTimeout(element, event) {
            checkIfBuiltTooltipNotExist(element, event);
            builtTooltip.style.display = 'block';
            builtTooltip.style.visibility = 'hidden';

            timeout = setTimeout(function() {
                builtTooltip.style.visibility = 'visible';
            }, Math.floor(options.timeout));

            stopTimeoutAndHideTooltipIfCursorOut(element);
        }

        function stopTimeoutAndHideTooltipIfCursorOut(element) {
            element.onmouseout = function() {
                builtTooltip.style.visibility = 'hidden';
                clearTimeout(timeout);
                element.onmousemove = null;
            };
        }

        function checkIfBuiltTooltipNotExist(element, event) {
            if(!builtTooltip) {
                builtTooltip = createTooltip();
                document.body.appendChild(builtTooltip);
                setPosition(element, options.position, event);
                watchWindowSize(element);
            }
        }

        function hideTooltip() {
            if(options.rebuild) {
                builtTooltip.remove();
                builtTooltip = null;
            }
            else {
                builtTooltip.style.display = 'none';
            }
        }

        function createTooltip() {
            var tooltip = document.createElement('div');
            var tooltipText = document.createElement('span');

            if(options.htmlContent) {
                tooltipText.innerHTML = currentTooltip.innerHTML;
            }
            else if(options.attrContent) {
                tooltipText.textContent = currentTooltip.getAttribute(options.attrContent);
            }
            else {
                tooltipText.textContent = currentTooltip.textContent;
            }

            setTheme({tooltip, tooltipText});
            tooltip.appendChild(tooltipText);

            return tooltip;
        }

        function setTheme(items) {
            if(options.position === 'custom') {
                items.tooltip.classList.add('kn-tooltip', 'kn-tooltip_theme_' + options.theme);
                items.tooltipText.classList.add('kn-tooltip__text', 'kn-tooltip__text_theme_' + options.theme);
            }
            else if(options.position === 'cursor') {
                items.tooltip.classList.add('kn-tooltip', 'kn-tooltip_theme_' + options.theme + '-without-arrow');
                items.tooltipText.classList.add('kn-tooltip__text', 'kn-tooltip__text_theme_' + options.theme + '-without-arrow');
            }
            else {
                items.tooltip.classList.add('kn-tooltip', 'kn-tooltip_theme_' + options.theme + '-' + options.position);
                items.tooltipText.classList.add('kn-tooltip__text', 'kn-tooltip__text_theme_' + options.theme + '-' + options.position);
            }
        }

        function setPosition(element, position, event) {
            var builtTooltipPosX;
            var builtTooltipPosY;

            if(position === 'right' || position === 'left') {
                if(position === 'right') {
                    builtTooltipPosX = Math.floor(element.getBoundingClientRect().right) + options.offset;
                }
                else if(position === 'left') {
                    builtTooltipPosX = Math.floor(element.getBoundingClientRect().left) - builtTooltip.getBoundingClientRect().width - options.offset;
                }

                setPosX(builtTooltipPosX);

                builtTooltipPosY = Math.floor(element.getBoundingClientRect().top) - builtTooltip.getBoundingClientRect().height / 2 + element.getBoundingClientRect().height / 2;
                setPosY(builtTooltipPosY);
            }
            else if(position === 'top' || position === 'bottom') {
                if(position === 'top') {
                    builtTooltipPosY = Math.floor(element.getBoundingClientRect().top) - builtTooltip.getBoundingClientRect().height - options.offset;
                }
                else if(position === 'bottom') {
                    builtTooltipPosY = Math.floor(element.getBoundingClientRect().bottom) + options.offset;
                }

                setPosY(builtTooltipPosY);

                builtTooltipPosX = Math.floor(element.getBoundingClientRect().left) - builtTooltip.getBoundingClientRect().width / 2 + element.getBoundingClientRect().width / 2;
                setPosX(builtTooltipPosX);
            }
            else if(position === 'custom') {
                builtTooltipPosX = Math.floor(element.getBoundingClientRect().left) + options.custom.x;
                builtTooltipPosY = Math.floor(element.getBoundingClientRect().top) + options.custom.y;
                setPosX(builtTooltipPosX);
                setPosY(builtTooltipPosY);
            }
            else if(position === 'cursor') {
                builtTooltipPosX = Math.floor(event.pageX - window.scrollX);
                setPosX(builtTooltipPosX);
                builtTooltipPosY = Math.floor(event.pageY - window.scrollY);
                setPosY(builtTooltipPosY);
            }

            function setPosX(x) {
                builtTooltip.style.left = x + window.scrollX + 'px';
            }

            function setPosY(y) {
                builtTooltip.style.top = y + window.scrollY + 'px';
            }
        }

        function watchWindowSize(element) {
            window.addEventListener('resize', updatePositionTooltip, false);

            if(options.resetPosition) {
                window.addEventListener('mouseover', updatePositionTooltip, false);
            }

            function updatePositionTooltip() {
                element.onmouseover = function(event) {
                    setPosition(element, options.position, event);
                    element.onmouseover = null;
                }
            }
        }


    }

    global.knTooltip = {
        settings: setSettings
    };

}(this);