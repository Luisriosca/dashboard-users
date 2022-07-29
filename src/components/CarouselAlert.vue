<template>
    <div class="p-0">
        <div id="carouselExampleSlidesOnly" class="carousel slide carousel-fade" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="1000">
                    <div class="alert alert-warning">
                        <span>{{content1}}</span>
                    </div>
                </div>
                <div class="carousel-items" data-bs-interval="1000">
                    <div class="alert alert-warning">
                        <span>{{content2}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default { 
    data() {
        return {

        }
    },
    methods: {
    },
    props: {
        content1: String,
        content2: String,
        content3: String,
    }
}
</script>