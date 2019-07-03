<?php

namespace App\Type;

use App\Entity\Song;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SongType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('soundcloudId', TextType::class)
            ->add('activated', CheckboxType::class)
            ->add('type', ChoiceType::class, [
                'choices' => [
                    'Track' => Song::TYPE_TRACK,
                    'Playlist' => Song::TYPE_PLAYLIST
                ]
            ])
            ->add('category', ChoiceType::class, [
                'choices' => [
                    'Song' => Song::CATEGORY_SONG,
                    'Mix' => Song::CATEGORY_MIX,
                    'EP' => Song::CATEGORY_EP
                ]
            ])
            ->add('visual', CheckboxType::class, [
                'required' => false
            ])
            ->add('sort', IntegerType::class)
            ->add('save', SubmitType::class);
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => Song::class,
        ));
    }
}