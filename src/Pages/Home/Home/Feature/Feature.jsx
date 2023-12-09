


const Feature = () => {
  return (
    <div className="px-10 md:px-xPadding my-myMargin">
      <div>
        <div className="flex justify-center">
          <div>
            <h1 className="text-3xl font-medium text-center">Features</h1>
            <div className="mt-3 mb-10 w-60 h-[2px] bg-red-200"></div>
          </div>
        </div>
        <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div>
              <h3 className="text-2xl text-gray-600 font-medium mb-3">Campaign Spotlights</h3>
              <p>
              The Campaign Spotlights section serves as a dynamic focal point on our website, drawing attention to ongoing or upcoming donation initiatives that embody the heart of our mission. Here, visitors can explore compelling narratives and visual representations of impactful projects, each with a specific cause or goal. Whether it's a drive to provide essential resources for underprivileged communities, support educational programs, or contribute to healthcare advancements, our Campaign Spotlights shed light on the pressing needs and the tangible impact that can be achieved through collective efforts
              </p>
            </div>
            <div>
              <h3 className="text-2xl text-gray-600 font-medium mb-3">Success Story</h3>
              <p>
              Our Success Stories section is a testament to the transformative power of collective goodwill and generosity. Here, we proudly showcase the real impact that our donors have made in the lives of individuals and communities around the world. These stories narrate the journey from compassion to concrete change, highlighting the tangible results of contributions – be it providing education, healthcare, or essential resources. Through compelling narratives and vivid testimonials, visitors get a firsthand look at the positive transformations brought about by their support.
              </p>
            </div>
            <div>
              <h3 className="text-2xl text-gray-600 font-medium mb-3"> Volunteer Opportunities</h3>
              <p>
              In our Volunteer Opportunities section, we invite individuals to become the driving force behind positive change. Here, you'll discover a range of meaningful opportunities to contribute your time, skills, and passion to causes that matter. Whether you're looking to make a direct impact on local communities, participate in exciting projects, or lend a helping hand in events, our diverse array of volunteer options caters to various interests and skill sets. We believe that volunteering is not just an act of service but a chance to form connections, learn, and grow together. From organizing fundraising events to participating in community outreach programs, each opportunity offers a unique avenue for personal and collective fulfillment.              </p>
            </div>
          </div>
        </div>        
      </div>
    </div>
  );
};

export default Feature;
