import './button.scss';
import {Button} from 'react-bootstrap';
import { ButtonVariantEnum, CustomButtonI } from '../../models/button.model';

export function CustomButton(props: CustomButtonI) {

    const { className, variant, onClick, Icon, text } = props;

    return (
       <>
        {
            Icon ? <div className='icon-container'>
                       <Icon className={className ? className : 'icon-button'} 
                             onClick={onClick}></Icon>
                       <span className='icon-text'>{text}</span>  
                   </div>
                 :  <Button variant={variant || ButtonVariantEnum.PRIMARY}
                            onClick={onClick}
                            className={className ? className : 'button'}>
                        {text}
                    </Button>
        }
       </>
    );

}