<template>
    <div>
        <h3>Ads</h3>
        <form @keyup.enter="addAd" ref="addDataForm" class="px-2">
            <p class="text-align-left">
                <label>Starting at: </label><input type="number" v-model.number="startingMin" name="minutes" placeholder="00" class="short-input" min="0" /> :
                <input type="number" v-model.number="startingSec" name="seconds" placeholder="01" class="short-input" min="0" max="59" />
            </p>

            <p class="text-align-left">
                <label>Duration:</label><input type="text" v-model.number="duration" autocomplete="off" name="link" class="short-input" placeholder="01" /> seconds
            </p>

            <p class="text-align-left">
                <label>Description:</label><input type="text" v-model="description" autocomplete="off" name="text" class="long-input mb-2" placeholder="Optional" />
            </p>

            <button type="button" class="btn mt-1 p-2" @click="addAd">Add Ad</button>

            <ul id="ads-list" class="text-align-left no-list-style centered">
                <Ad v-for="ad in ads" v-bind:key="ad.startingMin + '_' + ad.startingSec" :data-ad="ad"></Ad>
            </ul>

        </form>

    </div>
</template>


<script>
import Ad from './Ad';

export default {
    components: {
        Ad
    },
    name: 'Ads',
    props: ['ads-data'],
    data() {
        return {
            ads: [],

            startingMin: null,
            startingSec: null,
            duration: null,
            description: '',
        }
    },
    mounted() {
        this.ads = this.adsData;
    },
    methods: {
        addAd() {
            let formData = {
                'startingMin': this.startingMin,
                'startingSec': this.startingSec,
                'duration': this.duration,
                'description': this.description,
            };

            if (!formData.startingMin) {
                formData.startingMin = 0;
            }

            if (!formData.startingSec) {
                formData.startingSec = 0;
            }

            if (!formData.duration) {
                formData.duration = 1;
            }

            if (formData.startingSec > 59 || formData.startingSec < 0) {
                alert('Invalid seconds value');
                return;
            }

            if (formData.startingMin < 0) {
                alert('Invalid minutes value');
                return;
            }

            if (formData.duration < 1) {
                alert('Invalid duration value');
                return;
            }

            if (this.ads.some(e => e.startingMin == formData.startingMin && e.startingSec == formData.startingSec)) {
                alert('An ad for this point already exist');
                return;
            }

            let index = this.findAdPosition(formData.startingMin, formData.startingSec);

            this.$refs['addDataForm'].reset();
            this.$emit('addAd', { formData: formData, index: index });
        },

        findAdPosition(minutes, seconds) {
            let index = 0;
            let secondsSum = (minutes * 60) + seconds;

            this.ads.forEach(function(element){

                let elementSecondsSum = (element.startingMin * 60) + element.startingSec;
                if (elementSecondsSum <= secondsSum) {
                    index++;
                }
            });

            return index;
        }
    }
}
</script>

<style scoped>
    label {
        display:inline-block;
        width:110px;
    }
</style>