
<div class="ss_main">
	<img src="${ this.src }" alt="" usemap="#linkmap">
</div>

<map name="linkmap">
	[[ for (const item of this) { ]]
  		<area shape="rect" coords="${item.coords }" alt="" href="#${ item.name }">
	[[ } ]]
</map>

[[ for (const item of this) { ]]
<section class="ss_section" id="${ item.name }">
	<img src="${ item.src }" alt="">
</section>
[[ } ]]