<template>
    <div>
        <h3>Ads</h3>
        <form @keyup.enter="addAd" ref="addDataForm" class="px-2">
            <p class="text-align-left">
                <label>Starting at: </label><input type="number" v-model.number="minutes" name="minutes" placeholder="00" class="short-input" min="0" /> :
                <input type="number" v-model.number="seconds" name="seconds" placeholder="01" class="short-input" min="0" max="59" />
            </p>

            <p class="text-align-left">
                <label>Duration:</label><input type="text" v-model.number="duration" autocomplete="off" name="link" class="short-input" placeholder="01" /> seconds
            </p>

            <p class="text-align-left">
                <label>Description:</label><input type="text" v-model="description" autocomplete="off" name="text" class="long-input mb-2" placeholder="Optional" />
            </p>

            <button type="button" class="btn mt-1 p-2" @click="addAd">Add Ad</button>

            <ul id="ads-list" class="text-align-left no-list-style centered">
                <Ad v-for="ad in ads" v-bind:key="ad.time" :data-ad="ad"></Ad>
            </ul>

        </form>

    </div>
</template>


<script>
import Helper from '../mixins/Helper';
import Ad from './Ad';

export default {
    components: {
        Ad
    },
    mixins:[Helper],
    name: 'Ads',
    props: ['ads-data'],
    data() {
        return {
            ads: [],

            minutes: null,
            seconds: null,
            duration: null,
            description: '',
        }
    },
    mounted() {
        this.ads = this.adsData;
    },
    methods: {
        addAd() {

            if (!this.minutes) {
                this.minutes = 0;
            }

            if (!this.seconds) {
                this.seconds = 0;
            }

            if (!this.duration) {
                this.duration = 1;
            }

            if (this.seconds > 59 || this.seconds < 0) {
                alert('Invalid seconds value');
                return;
            }

            if (this.minutes < 0) {
                alert('Invalid minutes value');
                return;
            }

            if (this.duration < 1) {
                alert('Invalid duration value');
                return;
            }

            let point = (this.minutes * 60) + this.seconds;
            if (this.ads.some(e => e.time == point)) {
                alert('An ad for this point already exists');
                return;
            }

            let formData = {
                'time': point,
                'duration': this.duration,
                'description': this.description,
            };

            let index = this.findIndexInList(point, this.ads);

            this.$emit('addAd', { formData: formData, index: index });
        },

        resetForm() {
            this.minutes = null;
            this.seconds = null;
            this.duration = null;
            this.description = '';
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