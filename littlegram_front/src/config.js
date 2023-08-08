var config = {
    baseURL: 'http://127.0.0.1:3333',
    filtros: [
        {
          name: 'normal',
          filter: [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0,
          ],
          colorOne: null,
          colorTwo: null
        },
        {
          name: 'invertido',
          filter: 'invert',
          colorOne: null,
          colorTwo: null
        }, {
          name: 'noir',
          filter: 'grayscale',
          colorOne: null,
          colorTwo: null
        },
        {
          name: 'sepia',
          filter: 'sepia',
          colorOne: null,
          colorTwo: null
        }, {
          name: 'vermelho/azul',
          filter: 'duotone',
          colorOne: [250, 50, 50],
          colorTwo: [20, 20, 100]
        }, {
          name: 'verde/roxo',
          filter: 'duotone',
          colorOne: [50, 250, 50],
          colorTwo: [250, 20, 220]
        }, {
          name: 'azul claro/laranja',
          filter: 'duotone',
          colorOne: [40, 250, 250],
          colorTwo: [250, 150, 30]
        }, {
          name: 'azul/vermelho',
          filter: 'duotone',
          colorOne: [40, 70, 200],
          colorTwo: [220, 30, 70]
        }
        , {
          name: 'amaro',
          filter: [
            0.3, 0.6, 0.1, 0, 0,
            0.1, 0.5, 0.1, 0, 0,
            0.2, 0.4, 0.4, 0, 0,
            0, 0, 0, 1, 0
          ],
          colorOne: null,
          colorTwo: null
        }, {
          name: 'kalvin',
          filter: [
            0.63467516026, 0.1781653486, 0.0436880701, 0, 0,
            0.0566428529, 0.6214963644, 0.034960766, 0, 0,
            0.013829964, 0.0271999143, 0.1254453572, 0, 0,
            0, 0, 0, 1, 0
          ],
          colorOne: null,
          colorTwo: null
        }
        , {
          name: 'vintage',
          filter: [
            0.62793, 0.32021, -0.03965, 0, 0.03784,
            0.02578, 0.64411, 0.03259, 0, 0.02926,
            0.0466, -0.08512, 0.52416, 0, 0.02023,
            0, 0, 0, 1, 0
          ],
          colorOne: null,
          colorTwo: null
        }, {
          name: 'alto vermelho',
          filter: [
            2, -1, 0, 0, 0,
            -1, 2, -1, 0, 0,
            -1, -1, 2, 0, 0,
            0, 0, 0, 1, 0
          ],
          colorOne: null,
          colorTwo: null
        }
        , {
          name: 'azulado',
          filter: [
            0.272, 0.534, 0.131, 0, 0,
            0.349, 0.686, 0.168, 0, 0,
            0.393, 0.769, 0.189, 0, 0,
            0, 0, 0, 1, 0
          ],
          colorOne: null,
          colorTwo: null
        }
        , {
          name: 'clareador',
          filter: [
            0.5, 0.5, 0.5, 0, 0,
            0.5, 0.5, 0.5, 0, 0,
            0.5, 0.5, 0.5, 0, 0,
            0, 0, 0, 1, 0
          ],
          colorOne: null,
          colorTwo: null
        }
      ]
}

export default config






// 1.3935000000000002 -0.35750000000000004 -0.03599999999999999 0 0 -0.10650000000000001 1.1575 -0.03599999999999999 0 0 -0.10650000000000001 -0.35750000000000004 1.4640000000000002 0 0 0 0 0 1 0" /></filter></svg>#filter\'); -webkit-filter:hue-rotate(-10deg) contrast(0.9) brightness(1.1) saturate(1.5); filter:hue-rotate(-10deg) contrast(0.9) brightness(1.1) saturate(1.5);');

    
            // a1977Rule.append('-webkit-filter:sepia(0.5) hue-rotate(-35deg) saturate(1.6) contrast(0.9); filter:url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="matrix" color-interpolation-filters="sRGB" values="0.6965 0.3845 0.0945 0 0 0.1745 0.8430000000000001 0.084 0 0 0.136 0.267 0.5655 0 0 0 0 0 1 0" /><feColorMatrix type="matrix" color-interpolation-filters="sRGB" values="1.4722000000000002 -0.42899999999999994 -0.0432 0 0 -0.1278 1.1869999999999998 -0.0432 0 0 -0.1278 -0.42899999999999994 1.5568000000000002 0 0 0 0 0 1 0" /><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="linear" slope="0.9" intercept="0.04999999999999999" /><feFuncG type="linear" slope="0.9" intercept="0.04999999999999999" /><feFuncB type="linear" slope="0.9" intercept="0.04999999999999999" /></feComponentTransfer></filter></svg>#filter\'); -webkit-filter:sepia(0.5) hue-rotate(-35deg) saturate(1.6) contrast(0.9); filter:sepia(0.5) hue-rotate(-35deg) saturate(1.6) contrast(0.9);');


            // brannanRule.append('filter:url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="matrix" color-interpolation-filters="sRGB" values="0.6965 0.3845 0.0945 0 0 0.1745 0.8430000000000001 0.084 0 0 0.136 0.267 0.5655 0 0 0 0 0 1 0" /><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="linear" slope="1.3" intercept="-0.15000000000000002" /><feFuncG type="linear" slope="1.3" intercept="-0.15000000000000002" /><feFuncB type="linear" slope="1.3" intercept="-0.15000000000000002" /></feComponentTransfer></filter></svg>#filter\'); -webkit-filter:sepia(0.5) contrast(1.3); filter:sepia(0.5) contrast(1.3);');

       

            // earlybirdRule.append('filter:url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="matrix" color-interpolation-filters="sRGB" values="0.7572 0.30760000000000004 0.0756 0 0 0.1396 0.8744000000000001 0.06720000000000001 0 0 0.10880000000000001 0.2136 0.6524 0 0 0 0 0 1 0" /><feColorMatrix type="matrix" color-interpolation-filters="sRGB" values="1.6296000000000002 -0.572 -0.0576 0 0 -0.17040000000000002 1.246 -0.0576 0 0 -0.17040000000000002 -0.572 1.7424000000000002 0 0 0 0 0 1 0" /><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="linear" slope="1.1" intercept="-0.050000000000000044" /><feFuncG type="linear" slope="1.1" intercept="-0.050000000000000044" /><feFuncB type="linear" slope="1.1" intercept="-0.050000000000000044" /></feComponentTransfer><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="linear" slope="0.9" /><feFuncG type="linear" slope="0.9" /><feFuncB type="linear" slope="0.9" /></feComponentTransfer></filter></svg>#filter\'); -webkit-filter:sepia(0.4) saturate(1.8) contrast(1.1) brightness(0.9) hue-rotate(-20deg); filter:sepia(0.4) saturate(1.8) contrast(1.1) brightness(0.9) hue-rotate(-20deg);');

            // inkwellRule.append('filter:url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="matrix" color-interpolation-filters="sRGB" values="0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0" /><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="linear" slope="1.2" /><feFuncG type="linear" slope="1.2" /><feFuncB type="linear" slope="1.2" /></feComponentTransfer><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="linear" slope="1.05" intercept="-0.025000000000000022" /><feFuncG type="linear" slope="1.05" intercept="-0.025000000000000022" /><feFuncB type="linear" slope="1.05" intercept="-0.025000000000000022" /></feComponentTransfer></filter></svg>#filter\'); -webkit-filter:grayscale(1) brightness(1.2) contrast(1.05); filter:grayscale(1) brightness(1.2) contrast(1.05);');


          
            // lofiRule.append('filter:url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="linear" slope="1.5" intercept="-0.25" /><feFuncG type="linear" slope="1.5" intercept="-0.25" /><feFuncB type="linear" slope="1.5" intercept="-0.25" /></feComponentTransfer><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="linear" slope="0.9" /><feFuncG type="linear" slope="0.9" /><feFuncB type="linear" slope="0.9" /></feComponentTransfer><feColorMatrix type="matrix" color-interpolation-filters="sRGB" values="0.96965 0.038449999999999984 0.009450000000000014 0 0 0.01745000000000002 0.9843000000000001 0.008400000000000019 0 0 0.013600000000000001 0.026700000000000057 0.95655 0 0 0 0 0 1 0" /></filter></svg>#filter\'); filter:contrast(1.5) brightness(0.9) sepia(0.05); -webkit-filter:contrast(1.5) brightness(0.9) sepia(0.05);');

         
//"1.3935000000000002 -0.35750000000000004 -0.03599999999999999 0 0 -0.10650000000000001 1.1575 -0.03599999999999999 0 0 -0.10650000000000001 -0.35750000000000004 1.4640000000000002 0 0 0 0 0 1 0" /><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="linear" slope="0.9" intercept="0.04999999999999999" /><feFuncG type="linear" slope="0.9" intercept="0.04999999999999999" /><feFuncB type="linear" slope="0.9" intercept="0.04999999999999999" /></feComponentTransfer><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="linear" slope="1.1" /><feFuncG type="linear" slope="1.1" /><feFuncB type="linear" slope="1.1" /></feComponentTransfer></filter></svg>#filter\'); -webkit-filter:sepia(0.4) saturate(1.5) contrast(0.9) brightness(1.1) hue-rotate(-15deg); filter:sepia(0.4) saturate(1.5) contrast(0.9) brightness(1.1) hue-rotate(-15deg);');
