export class Helpers {
    static updateHeadComponentDidMount(title, metaDescription) {
		document.title = title;
	
		const descriptionMeta = document.querySelector('meta[name="description"]');

		if (descriptionMeta) {
			descriptionMeta.content = metaDescription;
		}
		else {
			const newDescriptionMeta = document.createElement('meta');

			newDescriptionMeta.name = 'description';
			newDescriptionMeta.content = metaDescription;

			document.head.appendChild(newDescriptionMeta);
		}
    }
  
    static updateHeadComponentWillUnmount() {
		document.title = 'React App';
	
		const descriptionMeta = document.querySelector('meta[name="description"]');

		if (descriptionMeta) {
			descriptionMeta.content = 'React App';
		}
    }

	static appInfo() {
        return {
            app_name: 'Blog Platform',
        };
    }
};

export default Helpers;
