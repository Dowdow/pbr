<?php

namespace App\Controller;

use App\Entity\Video;
use App\Type\VideoType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class AdminVideoController
 * @package App
 *
 * @Route("/admin/videos", schemes={"%protocol%"})
 */
class AdminVideoController extends AbstractController
{
    /**
     * @Route("/", name="admin_videos")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @IsGranted("TWITCH_ID")
     *
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function videosAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $videoRepo = $em->getRepository(Video::class);

        // HANDLE CHANGES
        if ($request->isMethod(Request::METHOD_POST)) {
            // VIDEO DELETE
            if ($request->request->has('delete_video')) {
                $videoId = $request->request->get('delete_video');
                $videoToDelete = $videoRepo->find($videoId);
                if ($videoToDelete !== null) {
                    $em->remove($videoToDelete);
                }
            }
            // VIDEO ACTIVATION
            if ($request->request->has('activation_video')) {
                $videoId = $request->request->get('activation_video');
                $videoToChangeState = $videoRepo->find($videoId);
                if ($videoToChangeState !== null) {
                    $videoToChangeState->setActivated(!$videoToChangeState->isActivated());
                }
            }
        }

        $em->flush();

        $videos = $videoRepo->findBy([], ['id' => 'desc']);

        return $this->render('admin/video/videos.html.twig', [
            'videos' => $videos,
        ]);
    }

    /**
     * @Route("/create", name="admin_videos_create")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @IsGranted("TWITCH_ID")
     *
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function createVideoAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $video = new Video();
        $videoForm = $this->createForm(VideoType::class, $video);

        $videoForm->handleRequest($request);
        if ($videoForm->isSubmitted() && $videoForm->isValid()) {
            $em->persist($video);
            $em->flush();

            return $this->redirectToRoute('admin_videos');
        }

        return $this->render('admin/video/create.html.twig', [
            'videoForm' => $videoForm->createView(),
        ]);
    }

    /**
     * @Route("/edit/{id}", name="admin_videos_edit")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @IsGranted("TWITCH_ID")
     *
     * @param Request $request
     * @param Video $video
     * @return RedirectResponse|Response
     */
    public function editVideoAction(Request $request, Video $video)
    {
        $em = $this->getDoctrine()->getManager();

        $videoForm = $this->createForm(VideoType::class, $video);

        $videoForm->handleRequest($request);
        if ($videoForm->isSubmitted() && $videoForm->isValid()) {
            $em->flush();

            return $this->redirectToRoute('admin_videos');
        }

        return $this->render('admin/video/update.html.twig', [
            'video' => $video,
            'videoForm' => $videoForm->createView(),
        ]);
    }

    /**
     * @Route("/sort", name="admin_videos_sort")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @IsGranted("TWITCH_ID")
     *
     * @param Request $request
     * @return JsonResponse|RedirectResponse
     */
    public function videoSortAction(Request $request)
    {
        if (!$request->query->has('id') || !$request->query->has('sort')) {
            throw new AccessDeniedHttpException();
        }

        $id = $request->query->get('id');
        $sort = (int)$request->query->get('sort');

        $em = $this->getDoctrine()->getManager();

        $video = $em->getRepository(Video::class)->find($id);
        if ($video === null) {
            throw new NotFoundHttpException();
        }

        $video->setSort($sort);

        $em->flush();

        return new JsonResponse(['message' => 'Ok']);
    }
}