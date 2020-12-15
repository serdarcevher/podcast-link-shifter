<template>
    <div>
        <input type="file" multiple="false" ref="mp3" accept=".mp3,audio/*" @change="loadPodcast" style="display: none">

        <a href="javascript:void(0);" @click="$refs.mp3.click()" class="mr-2">Load your podcast to test links</a>

        <div>
            <audio controls="controls" :src="source" type="audio/mp3"></audio>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Player',
    data() {
        return {
            source: null,
        }
    },
    methods: {
        loadPodcast(event) {
            let that = this;
            let file = event.target.files[0];

            let reader = new FileReader();

            reader.onload = function(e) {
                let url = e.target.result;
                that.source = url;
            };
            reader.readAsDataURL(file);
        }
    }
}
</script>