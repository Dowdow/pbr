<?php

namespace App\Controller;

use App\Entity\Transition;
use App\Type\TransitionType;
use Exception;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class AdminTransitionController
 * @package App\Controller
 *
 * @Route("/admin/transitions", schemes={"%protocol%"})
 */
class AdminTransitionController extends AbstractController
{
    /**
     * @Route("/", name="admin_transitions")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @IsGranted("TWITCH_ID")
     *
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function transitionsAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $transitionRepo = $em->getRepository(Transition::class);

        // HANDLE CHANGES
        // TRANSITION DELETE
        if ($request->isMethod(Request::METHOD_POST) && $request->request->has('delete_transition')) {
            $transitionId = $request->request->get('delete_transition');
            $transitionToDelete = $transitionRepo->find($transitionId);
            if ($transitionToDelete !== null) {
                $filesytem = new Filesystem();
                $filesytem->remove($this->getParameter('transitions_directory') . '/' . $transitionToDelete->getFileName());

                $em->remove($transitionToDelete);
            }
        }

        $em->flush();

        $transitions = $transitionRepo->findBy([], ['id' => 'desc']);

        return $this->render('admin/transition/transitions.html.twig', [
            'transitions' => $transitions,
        ]);
    }

    /**
     * @Route("/create", name="admin_transitions_create")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @IsGranted("TWITCH_ID")
     *
     * @param Request $request
     * @return Response|RedirectResponse
     * @throws Exception
     */
    public function createTransitionAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $transition = new Transition();
        $transitionForm = $this->createForm(TransitionType::class, $transition);

        $transitionForm->handleRequest($request);
        if ($transitionForm->isSubmitted() && $transitionForm->isValid()) {
            /** @var UploadedFile $file */
            $file = $transitionForm->get('file')->getData();
            if ($file) {
                $transitionDirectory = $this->getParameter('transitions_directory');
                $filename = 'transition-' . uniqid('', true) . '.' . $file->guessExtension();

                try {
                    $file->move($transitionDirectory, $filename);
                } catch (FileException $e) {
                    throw new Exception('Error while uploading the transition');
                }

                $transition->setFileName($filename);
            }

            $em->persist($transition);
            $em->flush();

            return $this->redirectToRoute('admin_transitions');
        }

        return $this->render('admin/transition/create.html.twig', [
            'transitionForm' => $transitionForm->createView(),
        ]);
    }

    /**
     * @Route("/edit/{id}", name="admin_transitions_edit")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @IsGranted("TWITCH_ID")
     *
     * @param Request $request
     * @param Transition $transition
     * @return Response|RedirectResponse
     * @throws Exception
     */
    public function updateTransitionAction(Request $request, Transition $transition)
    {
        $em = $this->getDoctrine()->getManager();

        $transitionForm = $this->createForm(TransitionType::class, $transition);

        $transitionForm->handleRequest($request);
        if ($transitionForm->isSubmitted() && $transitionForm->isValid()) {
            /** @var UploadedFile $file */
            $file = $transitionForm->get('file')->getData();
            if ($file) {
                $transitionDirectory = $this->getParameter('transitions_directory');
                $filename = 'transition-' . uniqid('', true) . '.' . $file->guessExtension();

                try {
                    $file->move($transitionDirectory, $filename);
                } catch (FileException $e) {
                    throw new Exception('Error while uploading the transition');
                }

                $filesytem = new Filesystem();
                $filesytem->remove($transitionDirectory . '/' . $transition->getFileName());

                $transition->setFileName($filename);
            }

            $em->flush();

            return $this->redirectToRoute('admin_transitions');
        }

        return $this->render('admin/transition/update.html.twig', [
            'transition' => $transition,
            'transitionForm' => $transitionForm->createView(),
        ]);
    }
}
