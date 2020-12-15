const Helper = {
    methods: {
        timetoMinsAndSecs(time) {
            let minutes = Math.floor(time / 60);
            let seconds = time - minutes * 60;

            return { 'minutes': minutes, 'seconds': seconds }
        },

        findIndexInList(point, list) {
            let index = 0;

            list.forEach(function(element){
                if (element.time < point) {
                    index++;
                }
            });
            return index;
        }
    }
}

export default Helper;