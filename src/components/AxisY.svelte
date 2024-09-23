<script>
    export let yScale;
    export let yTicks;
    export let width;
    export let margin;  
</script>
    
<g class="axis y-axis">
  {#each yTicks as tick, i}
   <g
    class="tick tick-{tick}"
    transform="translate(0 {yScale(tick)})">
    <line 
    x1={0} 
    y1={margin.bottom}
    x2={width} 
    y2={margin.bottom}
    stroke={i==0 ? "#333333" : "#E2E3E4"}/>
    <text x={i === 0 ? 3 : i === 1 ? 3: 0} y={margin.bottom - 5}>{(tick * 100).toLocaleString()}{i == 5 ? "%" : ""}</text>
  </g>
  {/each}
  <text
    class="axis-title"
    x={-55}
    y="15"
    transform="rotate(-90)" 
    text-anchor="middle"
  >
    2023
  </text>
</g>
        