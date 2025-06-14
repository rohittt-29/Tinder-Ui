

const UserCard = ({user}) => {

   const { firstName, lastName , about, photoUrl, age, gender} = user;
  return (
   <div className="card bg-base-200 w-86  shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="Name text-3xl text-white font-semibold">{firstName+ " " + lastName}</h2>
    <p className='text-xl text-white/70 '>{about}</p>
{age && gender && <p>{age + " , " + gender}</p>}
    <div className="card-actions justify-center mt-8 gap-5">
      <button className="bg-red-700 py-3 px-4 font-medium rounded bg-gradient-to-tr from-red-800 hover:bg-red-600 cursor-pointer ">Ignore</button>
            <button className="bg-pink-700  py-3 px-4 font-medium rounded bg-gradient-to-tl from-pink-400 hover:bg-pink-600 cursor-pointer">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
