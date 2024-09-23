<script>
    export let xScale;
    export let xTicks;
    export let height;
    export let margin;
    
</script>
    
    <g class="axis x-axis">
        {#each xTicks as tick, i}
          <g class="tick tick-{tick}" transform="translate({xScale(tick) + margin.left},{margin.top})">
            <line x1={0} x2={0} y1="0" y2={height} stroke={i==0 ? "#333333" : "#E2E3E4"} stroke-width=1/>
            <text x=0 y={height} dx={i === 0 ? "-4" : "-4"} dy="20">{(tick * 100).toLocaleString()}{i == 0 ? "%" : ""}</text>
          </g>
        {/each}
            <!-- X-axis label -->
    <text
    class="axis-title"
    x={(xScale.range()[1]) * 3.6/4} 
    y={height + 10} 
    text-anchor="middle"
>
    2014
</text>
    </g>
    