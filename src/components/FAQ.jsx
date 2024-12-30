function FAQ() {
    const faqItems = [
        {
          question: "How do I create a betslip?",
          answer: "Simply select your desired bets from any number of fixtures, place your desired stake and compare the possible return across multiple bookmakers." 
        },
        {
          question: "Is MyBetBuilder free to use?",
          answer: "Yes, MyBetBuilder is completely free to use."
        },
        {
          question: "What type of odds are available?",
          answer: "We currently only support pre-game odds, but will be adding live odds soon."
        },
        {
            question: "Why was MyBetBuilder created?",
            answer: "Sometimes finding the best odds for a bet can be difficult, so we wanted to make it easier for bettors to find the best odds for their bets, whether placing single bets, accumulators, or other combinations."
        },
        {
            question: "Do I need to sign up to use MyBetBuilder?",
            answer: "No, you do not need to sign up to use MyBetBuilder. Start building your betbuilders right away!"
        },
        {
          question: "What leagues are supported?",
          answer: "We currently support the English Premier League, but will be adding more leagues soon."
        },
        {
          question: "What bookmakers are supported?",
          answer: "We currently support 16 bookmakers across the world, but will be adding more bookmakers soon."
        },

    ];
    

  return (
    <section id="faq" className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} tabIndex={0} className="collapse collapse-plus  bg-white border">
                <div className="collapse-title text-xl font-medium">
                    {item.question}
                </div>
                <div className="collapse-content">
                    <p>{item.answer}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;