<script>
  import data from "./data/insurer.json";
  import { scaleLinear, scaleSqrt, scaleOrdinal } from "d3-scale";
  import { extent } from "d3-array";
  import Steps from "/components/Steps.svelte";
  import AxisX from "/components/AxisX.svelte";
  import AxisY from "/components/AxisY.svelte";
  import { fade } from "svelte/transition";
  import { format } from "d3-format";

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 25
  };

  $: width = 600;
  $: innerWidth = width - margin.left - margin.right;

  let height = 480;
  let innerHeight = height - margin.top - margin.bottom;

  $: extentX = extent(data, (d) => d.ff_pct_of_cost_14);
  $: extentY = extent(data, (d) => d.ff_pct_of_cost_23);
  $: extentR = extent(data, (d) => d.cost_all_2023);

  $: xScale = scaleLinear()
    .domain([0, extentX[1]])
    .range([0, innerWidth]);

  $: yScale = scaleLinear()
    .domain([0, extentY[1]])
    .range([innerHeight, 0]);

  $: rScale = scaleSqrt()
    .domain([0, extentR[1]])
    .range(width < 568 ? [2, 16] : [3, 24]);

  $: strokeScale = scaleOrdinal()
    .domain(["Y", "N"])
    .range([1.5, 0.2]);

  $: colorScale_higher = scaleOrdinal()
    .domain(["Y", "N"])
    .range(["#FAA224", "#B0B4C7"]);

  $: colorScale_lower = scaleOrdinal()
    .domain(["N", "Y"])
    .range(["#64BC52", "#B0B4C7"]);

  $: colorScale_callouts = scaleOrdinal()
    .domain(["Y", "N"])
    .range(["black", "white"]);

  let initialData = data;
  let renderedData = initialData;
  let labelData_A = renderedData.filter(d => d.callouts_A === 'Y');
  let labelData_B = renderedData.filter(d => d.callouts_B === 'Y');

  let currentStep;
  $: xTicks = xScale.ticks(8);
  $: yTicks = yScale.ticks(8);

  let highlightLower = false;
  let hightlightHigher = false;
  let showTheSize = false;
  let callOuts_A = false;
  let callOuts_B = false;

  $: {
    if (currentStep === 0) {
      highlightLower = false;
      hightlightHigher = false;
      showTheSize = false;
      callOuts_A = false;
      callOuts_B = false;
    }
    if (currentStep === 1) {
      highlightLower = true;
      hightlightHigher = false;
      showTheSize = false;
      callOuts_A = false;
      callOuts_B = false;
    }
    if (currentStep === 2) {
      highlightLower = false;
      hightlightHigher = true;
      showTheSize = true;
      callOuts_A = false;
      callOuts_B = false;
    }
    if (currentStep === 3) {
      highlightLower = false;
      hightlightHigher = true;
      showTheSize = true;
      callOuts_A = true;
      callOuts_B = false;
    }
    if (currentStep === 4) {
      highlightLower = true;
      hightlightHigher = false;
      showTheSize = true;
      callOuts_A = false;
      callOuts_B = true;
    }
  }

  const legendSize = [200000000000, 50000000000, 10000000000]; // Example sizes
  const formatBillion = format(".1s");
</script>

<main>
<section>
<div class="sticky">
<div class="chart-container" bind:clientWidth={width}>
  <h1>Fossil-fuel holdings as a percentage of property-and-casualty insurers’ securities, 2023 vs. 2014</h1>
  <svg {width} {height}>
    <AxisX {xScale} {xTicks} {margin} height = {innerHeight}/>
    <AxisY {yTicks} {yScale} width={innerWidth} {height} {margin}/>
    <g transform="translate({margin.left} {margin.top})">
        <!-- Diagonal line  -->
    {#if currentStep > 0}
    <line
    x1={xScale(0)}
    y1={yScale(0)}
    x2={xScale(0.124)}
    y2={yScale(0.124)}
    stroke="#333333"
    stroke-width="2"
    stroke-dasharray="0,5"
    stroke-linecap="round"
  />
  {/if}
      {#each renderedData as d}
        <circle
          class="circle-bg"
          cx={xScale(d.ff_pct_of_cost_14)}
          cy={yScale(d.ff_pct_of_cost_23)}
          r={showTheSize ? rScale(d.cost_all_2023) : 4}
          opacity={0.80}
          stroke={callOuts_A ? colorScale_callouts(d.callouts_A) : callOuts_B ? colorScale_callouts(d.callouts_B) : "white"}
          stroke-width={callOuts_A ? strokeScale(d.callouts_A) : callOuts_B ? strokeScale(d.callouts_B) : 0.2}
          fill={hightlightHigher ? colorScale_higher(d.bigger_than)
          : highlightLower ? colorScale_lower(d.bigger_than) : "#B0B4C7"}
        />
      {/each}
      {#if currentStep == 3}
        {#each labelData_A as d}
        <text
          transition:fade={{ delay: 250, duration: 300 }}
          class="text-lables"
          x={xScale(d.ff_pct_of_cost_14) + d.XNudge}
          y={yScale(d.ff_pct_of_cost_23) + d.YNudge}
        >
          {d.callouts_text}
        </text>
        {/each}
      {/if}
      {#if currentStep == 4}
        {#each labelData_B as d}
        <text
          transition:fade={{ delay: 250, duration: 300 }}
          class="text-lables"
          x={xScale(d.ff_pct_of_cost_14) + d.XNudge}
          y={yScale(d.ff_pct_of_cost_23) + d.YNudge}
        >
          {d.callouts_text}
        </text>
        {/each}
      {/if}
      
      {#if currentStep > 1}
      <g transform="translate({innerWidth * 3.4 / 5}, 40)">
        <text x="-60" y="-20" class="legend-title">Total securities cost in 2023</text>
        <g>
          <circle 
          cx="0" 
          cy={20}
          r={rScale(200000000000)} 
          fill="none" 
          stroke="#BFBFBF"
        />
        </g>
        <g>
          <circle 
          cx="0" 
          cy={30}
          r={rScale(50000000000)} 
          fill="none" 
          stroke="#BFBFBF"
        />
        </g>
        <g>
          <circle 
          cx="0" 
          cy={35}
          r={rScale(10000000000)} 
          fill="none" 
          stroke="#BFBFBF"
        />
        </g>
        {#each legendSize as size, i}
        <g transform="translate(0, {i * 20})">
          <text 
            class="legend-text" 
            x={i==0?34:40} 
            y="5"
          >
            {i==0? "$" + formatBillion(size).replace(/G/,"B") : formatBillion(size).replace(/G/,"B")}
          </text>
        </g>
        {/each}
      </g>
      {/if}
    </g>
</svg>
</div>
</div>
<Steps bind:currentStep/>
</section>
</main>

<style>
  /* Global styles for text and legend */
  :global(.tick text, .axis-title, .legend-text){
    fill: #666;
    text-anchor: start;
    font-family: RetinaNarrowLight, sans-serif;
    font-size: 13px;
    line-height: 15.6px;
  }

  .legend-text{
    fill: #666;
    text-anchor: start;
    font-family: RetinaNarrowLight, sans-serif;
    font-size: 13px;
    line-height: 15.6px;
    text-anchor: start;
    stroke: white;
    stroke-width: 8;
    paint-order: stroke;
  }

  :global(.axis-title){
    line-height: 13px;
    font-family: RetinaNarrow, sans-serif;
    text-transform: uppercase;
  }

  .legend-title{
    fill: #666;
    text-anchor: start;
    font-family: RetinaLight, sans-serif;
    font-size: 15px;
    line-height: 15.6px;
    text-anchor: start;
    stroke: white;
    stroke-width: 8;
    paint-order: stroke;
  }

  /* Container and layout styles */
  section {
    position: relative;
  }

  main {
    max-width: 1200px;
    margin: 0 auto;
  }

  .chart-container {
    height: 100%;
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .sticky {
    position: sticky;
    z-index: 1;
    height: 90vh;
    top: 5vh;
    margin-bottom: 1rem;
    display: flex;
    align-items: left;
    flex-direction: column;
  }

  circle {
    transition: all ease 200ms;
    mix-blend-mode: multiply;
  }

  h1 {
    color: #333333;
    font-family: Retina, sans-serif;
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 10px;
    text-align: left;
    width: 100%;
  }

  .text-lables {
    color: #333333;
    font-family: Retina, sans-serif;
    font-size: 14px;
  }
</style>
