<template>
	<div>
		<v-container 
			fluid 
			ma-0 
			pa-0
		>

			<v-parallax 
				height = "800" 
				src	   = "https://visavis.by/sites/all/themes/visavis2/images/forms.jpg"
			>
				<v-layout 
					row 
					wrap 
					text-xs-center
				>
					<v-flex 
						align-self-center 
						md4 
						sm12 
						xs12
					>
						<v-flex>
							<h1>
								Отзывы
								любимых
								клиентов
							</h1>
						</v-flex>
						<v-flex>
							<v-btn to = "/reviews">Отзывы всех клиентов</v-btn>
						</v-flex>
					</v-flex>
					<v-flex 
						align-self-center 
						md8 
						xs12
					>
						<v-carousel 
							hide-controls
						>
							<v-carousel-item 
								v-for = "(item,i) in changeQuantityDataToSix" 
								:key  = "i" 
								src   = "https://visavis.by/sites/all/themes/visavis2/images/forms.jpg"
							>
								<v-container>
									<v-layout 
										row 
										justify-center 
										wrap 
										style = "margin-top: 13%"
									>
										<v-flex 
											md8 
											sm12 
											xs12
										>
											<v-flex>
												<span class = "white--text">{{item.reviewsText}}</span>
											</v-flex>
											<v-flex>
												<span>{{item.namePearson}}</span>
											</v-flex>
										</v-flex>
										<v-flex 
											md4 
											sm5 
											xs6 
											d-flex
										>
											<v-img
												:src  = "item.src"
												style = "height: 190px; width: 240px; "
											></v-img>
										</v-flex>
									</v-layout>
								</v-container>
							</v-carousel-item>
						</v-carousel>
					</v-flex>
				</v-layout>
			</v-parallax>
		</v-container>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import review from '../../request/review'
export default {
	async created() {
        let dataRreviews = await review.read();

        let arrReviewsObj = dataRreviews.data.map((item, i) => {
            let reviewsObj = {};

            reviewsObj.reviewsText = item.review;
            reviewsObj.namePearson = item.name;
            reviewsObj.src         = item.photo;

            return reviewsObj;
        });

      this.addNewReviews(arrReviewsObj);
    },
	computed: {
		...mapState("reviewsSlider", {
			reviewsItems: "dataReviewsSlider"
		}),
		changeQuantityDataToSix() {
			return this.reviewsItems.slice(-6);
		}
	},
	methods: {
		...mapActions("reviewsSlider", ['addNewReviews']),
	},
};
</script>

<style scoped>
.container {
	background-image: none;
}

h1 {
	padding-bottom: 10%;
	font-family: "Cormorant", serif;
	font-size: 3em;
}
</style>