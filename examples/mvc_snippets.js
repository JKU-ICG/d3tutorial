

// MVC02 --------------------------------------------------------------------------

// TODO 1
    const pieTransform = d3.pie().value((d) => d.values.length).sortValues(null).sort(null);
    const calcArc = d3.arc().outerRadius(radius).innerRadius(0);
    const colorScale = d3.scaleOrdinal(d3.schemeAccent);

// TODO 2
    function update(new_data) { //{key: string, values: IPerson[]}[]
      const pied = pieTransform(new_data);
      // Render the chart with new data

      colorScale.domain(new_data.map((d) => d.key));

      // DATA JOIN
      const arcs = g.selectAll('path').data(pied, (d) => d.data.key).join(
        // ENTER
        // new elements
        (enter) => {
          const path_enter = enter.append('path')
            .attr('class', 'arc')
            .style('stroke', 'white');
          path_enter.append('title');
          return path_enter;
        }
      );

      // ENTER + UPDATE
      // both old and new elements
      arcs
        .attr('d', (d) => calcArc(d)) // TODO set the CSS class `selected` if the current data item is the selected sex in the state
        .style('fill', (d) => colorScale(d.data.key));

      arcs.select('title').text((d) => `${d.data.key}: ${d.data.values.length}`);
    }


// MVC03 --------------------------------------------------------------------------

// HTML
const genderHTML = `
  <strong>Selected Gender: </strong>
  <span id="selectedSex"></span>
`
// JS 
// State
const state = {
  data: [],
  passengerClass: "",
  selectedSex: null
};

// Click Handler
path_enter.on('click', (d) => {
  if (state.selectedSex === d.data.key) {
    state.selectedSex = null;
  } else {
    state.selectedSex = d.data.key;
  }
  updateApp();
});

// CSS Class
path
.classed('selected', (d) => d.data.key === state.selectedSex);


// Apply filter
function filterData() {
  return state.data.filter((d) => {
    if (state.passengerClass && d.pclass !== state.passengerClass) {
      return false;
    }
    if (state.selectedSex && d.sex !== state.selectedSex) { // <-- important
      return false;
    }
    return true;
  });
}

// Update label
d3.select('#selectedSex').text(state.selectedSex === null ? 'None' : state.selectedSex);



// MVC04 --------------------------------------------------------------------------

// HTML
// TODO 1
const survivedLabelHTML = `
  <strong>Selected Survived: </strong>
  <span id="selectedSurvived"></span>
`;

// TODO 2
const survivedChartsHTML = `
  <section>
    <h3>Survived Pie Chart</h3>
    <svg id="survived"></svg>
  </section>
  <section>
    <h3>Fare Histogram</h3>
    <svg id="fare"></svg>
  </section>
`;


// TODO 3
function createPieChart(svgSelector, stateAttr, colorScheme)

// TODO 4
const cscale = d3.scaleOrdinal(colorScheme);

// TODO 5
path_enter.on('click', (d) => {
  if (state[stateAttr] === d.data.key) {
    state[stateAttr] = null;
  } else {
    state[stateAttr] = d.data.key;
  }
  updateApp();
});

// TODO 5.2
path
  .classed('selected', (d) => d.data.key === state[stateAttr])

// TODO 6
const fareHistogram = d3.histogram()
.domain([0, d3.max(filtered, (d) => d.fare)])
.value((d) => d.fare);

const fareHistogramData = fareHistogram(filtered);

const survivedPieData = ['0', '1'].map((key) => ({
key,
values: filtered.filter((d) => d.survived === key)
}));

return {ageHistogramData, sexPieData, fareHistogramData, survivedPieData};

// TODO 7
const ageHistogram = createHistogram('#age');
const sexPieChart = createPieChart('#sex', 'selectedSex', d3.schemeAccent);
const survivedPieChart = createPieChart('#survived', 'selectedSurvived', d3.schemeSet3)
const fareHistogram = createHistogram('#fare');

// TODO 8
const {ageHistogramData, sexPieData, fareHistogramData, survivedPieData} = wrangleData(filtered);
ageHistogram(ageHistogramData);
sexPieChart(sexPieData);
fareHistogram(fareHistogramData)
survivedPieChart(survivedPieData);

// TODO 9
d3.select('#selectedSurvived').text(state.selectedSurvived || 'All');


// MVC04 --------------------------------------------------------------------------

// Define Function


// Store old Data
       
// Store old Data
const old = g.selectAll('path').data();

function tweenArc(d, i) {
  const interpolate = d3.interpolateObject(old[i], d);
  return (t) => arc(interpolate(t));
}

// Apply Animation
path
.classed('selected', (d) => d.data.key === state[stateAttr])
.transition()
.attrTween('d', tweenArc)

