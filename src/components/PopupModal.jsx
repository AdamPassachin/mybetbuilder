import check from '../assets/icons/check.svg'

function PopupModal({ features, visibleItems, onClose }) {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-[90%] min-h-[400px] flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            Welcome to MyBetBuilder!
            <span className="text-sm bg-black text-white px-2 py-1 rounded-lg font-mono transform -rotate-3">beta</span>
          </h2>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li
                key={index}
                className={`flex items-center space-x-3 transition-all duration-100 ${
                  index < visibleItems ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
              >
                <img 
                  src={check} 
                  alt="check" 
                  className="w-6 h-6"
                />
                <span className="text-lg">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="bg-black text-white px-6 py-3 rounded text-lg w-fit ml-auto 
            hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.25)]
            transition-all duration-150"
        >
          Start your betbuilder now!
        </button>
      </div>
    </div>
  )
}

export default PopupModal;