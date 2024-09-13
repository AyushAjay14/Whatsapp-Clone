import { CONNECTIONS } from "@/constant/connections";

function ContactList({handleClickOnUserContact}: {handleClickOnUserContact: (event: React.MouseEvent<HTMLElement>)=> void}){
    return (
        <>
        {CONNECTIONS.map((contact) => (
        <div
          key={contact.id}
          id={contact.id}
          className="contact__container"
          onClick={handleClickOnUserContact}
        >
          <div className="profile-photo__container">
            <img src={contact.profileImg} alt="" />
          </div>
          <div className="content__container">
            <h2>{contact.name}</h2>
          </div>
        </div>
      ))}
        </>
    )
}

export default ContactList;