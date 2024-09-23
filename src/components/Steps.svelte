<script>
  export let currentStep;
  import Scrolly from "../helpers/Scrolly.svelte";

  $: steps = [
    `<p>WSJ analyzed investments of property and casualty insurance companies and what share of their holdings were fossil fuel-related stocks and bonds in both 2023 and 2014.</p>`,
  `<p>The analysis found that for <span style="background-color:#64BC52;padding:3.5px;margin:1px;border-radius:4px;font-weight:500;color:white">most of the companies</span>, fossil-fuel investments accounted for a smaller share of their holdings in 2023 than they did a decade earlier. In the chart, these companies are represented by the dots below the diagonal line.</p>`,
  `Some of the companies whose share of investments in non-renewable energy rose in the past decade—represented by <span style="background-color:#FAA224;padding:3.5px;margin:1px;border-radius:4px;font-weight:500;color:white">the dots</span>above the diagonal line—were also among the largest overall spenders on securities.`,
  `More than 90% of that increase was driven by two firms: Warren Buffett's Berkshire Hathaway group, which includes auto insurer Geico, and State Farm.`,
  `Some insurers, like Allstate, have reduced coverage in climate-impacted areas while continuing to invest in fossil fuel companies. Others, like Axa, have nearly divested from fossil fuels since 2014.
  <br><br><span style="color: #727272;font-weight: 300; font-family: Retina, sans-serif;font-size: 13px;line-height: 17px; margin-top:6px;">Source: WSJ analysis of National Association of Insurance Commissioners filings<br>Ming Li/WSJ</span>`
];

</script>
<div class="steps">
  <Scrolly bind:value={currentStep}>
    {#each steps as text, i}
    <div class="step" class:active={currentStep === i}>
      <div class="step-content">
        {@html text}
      </div>
    </div>
    {/each}
  </Scrolly>
</div>

<style>
  .step {
  height: 90vh;
  opacity: 0.3;
  transition: opacity 300ms ease;

/* vertically and horizontally center the steps */
  display: flex;
  justify-content: center;
  place-items: center;

}

.step-content {
position: relative;
box-sizing: border-box;
z-index: 1;
-webkit-transform: translate3d(0, 0, 0); /*for safari z-index issue*/
height: auto;
width: 100%;
max-width: 550px; 
margin: 0 auto;
font-family: RetinaLight, sans-serif;
font-size: 17px;
line-height: 27px;
font-weight: 400;
color: #333;
padding: 20px 25px 20px;
box-shadow: 0 0 1px 0 rgba(0, 0, 0, .4);
overflow: visible;
background-color: rgba(255, 255, 255, .9);
}

.step.active {
opacity: 1;
}

.steps {
position: relative;
z-index: 2;
pointer-events: none;
display: flex;
justify-content: right;
place-items: right;
}

/* mark{
padding-top: 3px;
padding-bottom: 3px;
padding-left: 4px;
padding-right: 4px;
margin-right: 1px;
margin-left: 1px;
border-radius: 4px;
white-space: nowrap;
font-weight: 500;
text-shadow: none;
} */
</style>