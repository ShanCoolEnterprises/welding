import { Helmet } from 'react-helmet-async';

const TermsAndConditions = () => {
  return (
    <section className="py-16 px-6 bg-gray-100 text-gray-800">
      <Helmet>
        <title>Terms and Conditions - MR Steel Fabrication</title>
        <meta name="description" content="Read the terms and conditions for services provided by MR Steel Fabrication." />
      </Helmet>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Terms and Conditions</h1>
        <div className="space-y-4 text-base leading-7">
          <p><strong>1. Service Agreement:</strong> MR Steel Fabrication provides fabrication and welding services based on the design and requirements discussed with the customer. All work will be carried out professionally and to the best of our ability.</p>
          
          <p><strong>2. Payment Terms:</strong> 50% advance is required before starting any project. The remaining 50% must be paid on delivery or completion of the work. All payments are non-refundable once the material is purchased or fabrication has started.</p>
          
          <p><strong>3. Design Approval:</strong> Clients must approve the final design and measurements before fabrication. MR Steel Fabrication will not be responsible for any errors in unapproved designs.</p>
          
          <p><strong>4. Delivery Time:</strong> Project timelines depend on the scope of work and material availability. Any delay caused by external factors such as weather, supplier delay, or customer response is not the responsibility of MR Steel Fabrication.</p>
          
          <p><strong>5. Material Quality:</strong> We use SS, MS, and Aluminium of the quality specified during discussion. Any material change must be communicated before production.</p>
          
          <p><strong>6. Warranty:</strong> We offer a limited warranty on welding joints and structure integrity (not on rust or color fading). Physical damage after installation is not covered.</p>
          
          <p><strong>7. Site Access:</strong> The customer is responsible for providing safe and timely access to the site for measurements, installation, and delivery.</p>
          
          <p><strong>8. Cancellation:</strong> Orders once confirmed cannot be canceled without a cancellation fee. Custom designs and cut materials are non-refundable.</p>
          
          <p><strong>9. Dispute Resolution:</strong> Any disputes will be resolved amicably. If not, jurisdiction will fall under the courts of Greater Noida, Uttar Pradesh.</p>
        </div>
        <p className="mt-8 text-center text-sm text-gray-500">© {new Date().getFullYear()} MR Steel Fabrication. All rights reserved.</p>
      </div>
    </section>
  );
};

export default TermsAndConditions;
